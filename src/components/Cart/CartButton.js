import classes from './CartButton.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { showCartActions } from '../../store/showcart-slice';

const CartButton = props => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItems);
  const total = cartItems.reduce(
    (accumulator, cartItem) => accumulator + cartItem.amount,
    0
  );

  function toggleCartHandler() {
    dispatch(showCartActions.toggleCart());
  }

  return (
    <button onClick={toggleCartHandler} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{total}</span>
    </button>
  );
};

export default CartButton;
