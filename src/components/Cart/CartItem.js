import classes from './CartItem.module.css';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';

const CartItem = props => {
  const dispatch = useDispatch();
  const id = props.id,
    title = props.title,
    price = props.price,
    amount = props.amount,
    total = amount * price;

  function removeItemFromCartHandler() {
    dispatch(cartActions.removeItemFromCart(id));
  }

  function addItemToCartHandler() {
    dispatch(cartActions.addItemToCart(id));
  }

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.amount}>
          x <span>{amount}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeItemFromCartHandler}>-</button>
          <button onClick={addItemToCartHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
