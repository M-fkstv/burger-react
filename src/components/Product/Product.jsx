import PropTypes from 'prop-types';

import style from './Product.module.css';
import { API_URI } from '../../Constants/API.js';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../store/order/order.slice.js';
import { openModal } from '../../store/modal-product/modalProduct.slice';

export const Product = ({ item }) => {
  const dispatch = useDispatch();
  const func = () => {
    dispatch(openModal(item));
  };

  return (
    <article className={style.product}>
      <img
        src={`${API_URI}/${item.image}`}
        alt={item.title}
        onClick={() => func()}
        className={style.image}
      />

      <p className={style.price}>
        {item.price}
        <span className='currency'>&nbsp;₽</span>
      </p>

      <h3 className={style.title}>
        <button className={style.detail}>{item.title}</button>
      </h3>

      <p className={style.weight}>{item.weight}</p>

      <button
        onClick={() => {
          dispatch(addProduct({ id: item.id }));
        }}
        className={style.add}
        type='button'
      >
        Добавить
      </button>
    </article>
  );
};

Product.propTypes = {
  item: PropTypes.object,
};
