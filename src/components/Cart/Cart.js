import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import { useSelector } from 'react-redux';
const Cart = props => {
  const cartItems = useSelector(state => state.cart.cartItems);
  return (
    <Card className={classes.cart}>
      <h2>Your Cart</h2>
      <ul>
        {cartItems.map(cartItem => (
          <CartItem
            id={cartItem.id}
            key={cartItem.id}
            title={cartItem.title}
            amount={cartItem.amount}
            price={cartItem.price}
          />
        ))}
      </ul>
    </Card>
  );
};

export default Cart;
