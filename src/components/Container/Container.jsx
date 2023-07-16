import style from './Container.module.css';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export const Container = ({ className, children }) => {
  return (
    <div className={classNames(style.container, className)}>
      {children}
    </div>
  );
};

Container.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
}