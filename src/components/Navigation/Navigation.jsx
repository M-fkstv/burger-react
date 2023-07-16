import style from './Navigation.module.css';
import { Container } from '../Container/index.js';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { categoryAsyncRequest, changeCategory } from '../../store/category/category.slice.js';
import { useEffect } from 'react';
import { API_URI } from '../../Constants/API.js';

export const Navigation = () => {

  const { category, activeCategory }  = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(categoryAsyncRequest('max'));
  }, []);


  return (
    <nav className={style.navigation}>
      <Container className={style.container}>
        <ul className={style.list}>
          {category && category.map((item, index)=>{
            return (
              <li key={item.title} className={style.item}>
                <button
                  className={classNames(style.button,
                  activeCategory === index ? style.button_active : '' )}
                  style={{backgroundImage: `url(${API_URI}/${item.image})` }}
                  onClick={()=> {
                    dispatch(changeCategory(index))
                  }}
                >
                  {item.rus}
                </button>
              </li>
            )
          })}

        </ul>
      </Container>
    </nav>
  );
};