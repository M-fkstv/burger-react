import { Order } from '../Order/index.js';
import { Container } from '../Container/index.js';
import { Product } from '../Product/index.js';

import style from './Catalog.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { productAsyncRequest } from '../../store/product/product.slice.js';


export const Catalog = () => {
  const { products } = useSelector((state) => state.products);
  const { category, activeCategory } = useSelector((state) => state.category);

  const dispatch = useDispatch();


  useEffect(() => {
    if (category.length) {
      dispatch(productAsyncRequest(category[activeCategory].title));
    }

  }, [category, activeCategory]);


  return (
    <section className={style.catalog}>
      <Container className={style.container}>
        <Order/>

        <div className={style.wrapper}>
          <h2 className={style.title}>Бургеры</h2>

          <div className={style.wrap_list}>
            {products.length ? (
              <ul className={style.list}>
                {products.map((item) => {
                  return (
                    <li className={style.item} key={item.id}>
                      <Product item={item}/>
                    </li>
                  );
                })}
              </ul>
            ) : <p>К сожалению сейчас ничего нет</p>}
          </div>
        </div>
      </Container>
    </section>

  );
};