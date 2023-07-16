import style from './Header.module.css';
import { Container } from '../Container/index.js';
import logo from '../../assets/img/logo.svg';

export const Header = () => {
  return (
    <header className={style.header}>
      <Container >
        <div className={style.container}>

        <img className={style.logo} src={logo} alt="Логотип YourMeal"/>

        <div className={style.wrapper}>
          <h1 className={style.title}>
            <span>Только самые</span>
            <span className={style.red}>сочные бургеры!</span>
          </h1>

          <p className={style.appeal}>Бесплатная доставка от 599₽</p>
        </div>
        </div>
      </Container>
    </header>
  );
};