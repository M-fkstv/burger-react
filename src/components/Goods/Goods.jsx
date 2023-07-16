import style from './Goods.module.css';
import { Counter } from '../Counter';
import PropTypes from 'prop-types';
import { API_URI } from '../../Constants/API.js';


export const Goods = ({ item }) => {

  return (
    <li className={style.item}>
      <img className={style.image} src={`${API_URI}/${item.image}`} alt={item.title}/>

      <div className={style.goods}>
        <h3 className={style.title}>{item.title}</h3>

        <p className={style.weight}>{item.weight}</p>

        <p className={style.price}>{item.price}
          <span className="currency">&nbsp;₽</span>
        </p>
      </div>

      <Counter count={item.count} id={item.id}/>

    </li>
  );
};

Goods.propTypes = {
  item: PropTypes.object,
};