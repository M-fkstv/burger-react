import style from './Order.module.css';
import { Goods } from '../Goods/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { orederAsyncRequest } from '../../store/order/order.slice.js';
import { openModal } from '../../store/delivery/delivery.slice.js';


export const Order = () => {
  const { orderList, orderGoods, totalPrice, totalCount } = useSelector((state) => state.order);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(orederAsyncRequest());
  }, [dispatch, orderList.length]);


  return (
    <div className={style.order}>
      <section className={style.wrapper}>
        <div className={style.header} tabIndex="0" role="button">
          <h2 className={style.title}>Корзина</h2>

          <span className={style.count}>
            {totalCount} {/*NOT my method  */}
            {/*{orderList.map(item => item.count)*/}
            {/*.reduce((acc, item) => {*/}
            {/*  acc += item;*/}
            {/*  return acc*/}
            {/*/!*},0)}*!/  my method*/}
          </span>
        </div>

        <div className={style.wrap_list}>
          <ul className={style.list}>
            {orderGoods.map((item) => (
              <Goods item={item} key={item.id}/>
            ))}
          </ul>

          <div className={style.total}>
            <p>Итого</p>
            <p>
              <span className={style.amount}>
                {totalPrice} {/*NOT my method  */}
                {/*{orderList.map(item => item.price * item.count)*/}
                {/*  .reduce((acc, item) => {*/}
                {/*    acc += item;*/}
                {/*    return acc*/}
                {/*/!*  },0)}*!/  my method*/}
              </span>
              <span className="currency">&nbsp;₽</span>
            </p>
          </div>

          <button
            disabled={!orderGoods.length}
            onClick={() => dispatch(openModal())}
            className={style.submit}>
            Оформить заказ
          </button>

          <div className={style.apeal}>
            <p className={style.text}>Бесплатная доставка</p>
            <button className={style.close}>Свернуть</button>
          </div>
        </div>
      </section>
    </div>
  );
};