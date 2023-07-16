import style from './Counter.module.css';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addProduct, removeProduct } from '../../store/order/order.slice.js';

export const Counter = ({ count, id }) => {
const disatch = useDispatch();
  const handleAdd = () => {
    disatch(addProduct({id}))
  }

  const handleRemove = () => {
    disatch(removeProduct({id}))
  }

  return (
    <div className={style.count}>
      <button onClick={handleRemove} className={style.minus}>-</button>
      <p className={style.amount}>{count}</p>
      <button onClick={handleAdd}  className={style.plus}>+</button>
    </div>
  );
};

Counter.propTypes = {
  count: PropTypes.number,
  id: PropTypes.string,
};