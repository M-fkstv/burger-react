import classNames from 'classnames';
import style from './ModalProductCard.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../store/modal-product/modalProduct.slice';
import { addProduct } from '../../store/order/order.slice';
import { API_URI } from '../../Constants/API';
import { Counter } from '../Counter/Counter';

export const ModalProductCard = () => {
  const isOpen = useSelector((state) => state.modalProduct.isOpen);
  const item = useSelector((state) => state.modalProduct.item);
  const orderList = useSelector((state) => state.order.orderList);
  const dispatch = useDispatch();

  const res = orderList.find((el) => el.id === item.id);

  return (
    isOpen && (
      <div
        className={style.modal__product}
        onClick={({ target, currentTarget }) => {
          if (target === currentTarget) {
            dispatch(closeModal());
          }
        }}
      >
        <div className={style.product}>
          <h2 className={style.product__title}>{item.title}</h2>

          <div className={style.product__content}>
            <img
              className={style.product__image}
              src={`${API_URI}/${item.image}`}
              alt={item.title}
            />

            <p className={style.product__description}>{item.description}</p>

            <div
              className={classNames(
                style.product__ingredients,
                style.ingredients,
              )}
            >
              <h3 className={style.ingredients__title}>Состав:</h3>

              <ul className={style.ingredients__list}>
                {item.ingredients.map((el, index) => (
                  <li key={index} className={style.ingredients__item}>
                    {el}
                  </li>
                ))}
              </ul>

              <p className={style.ingredients__calories}>
                {item.weight}г, ккал {item.calories}
              </p>
            </div>
          </div>

          <div className={style.product__footer}>
            <div className={style.product__add}>
              <button
                onClick={() => {
                  dispatch(addProduct({ id: item.id }));
                }}
                className={style.product__btn}
              >
                Добавить
              </button>
              {res && <Counter count={res.count} id={item.id} />}
            </div>

            <p className={style.product__price}>
              <span className={style.product__price}>{item.price}</span>
              <span className={style.currency}>&nbsp;₽</span>
            </p>
          </div>

          <button
            className={style.modal__close}
            type='button'
            onClick={() => dispatch(closeModal())}
          >
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='currentColor'
              xmlns='http://www.w3.org/2000/svg'
            >
              <rect
                x='5.07422'
                y='5.28247'
                width='1'
                height='20'
                transform='rotate(-45 5.07422 5.28247)'
              />
              <rect
                x='5.78125'
                y='19.4246'
                width='1'
                height='20'
                transform='rotate(-135 5.78125 19.4246)'
              />
            </svg>
          </button>
        </div>
      </div>
    )
  );
};
