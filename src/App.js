import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { UIActions } from './store/UI-slice';
import { sendCartData } from './store/cart-actions';
import { fetchCartData } from './store/cart-actions';

let firstRender = true;
let secondRender = false;

function App() {
  const dispatch = useDispatch();
  const isShowCart = useSelector(state => state.showCart.isShowCart);
  const cartItems = useSelector(state => state.cart.cartItems);
  const notification = useSelector(state => state.UI.notification);

  useEffect(() => {
    dispatch(fetchCartData());
  }, []);

  useEffect(() => {
    if (firstRender) {
      firstRender = false;
      secondRender = true;
      return;
    }

    if (secondRender) {
      secondRender = false;
      return;
    }

    dispatch(sendCartData(cartItems));

    let timer = setTimeout(() => {
      dispatch(UIActions.hideNotification());
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [cartItems, dispatch]);

  return (
    <>
      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      )}
      <Layout>
        {isShowCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;

/*
  ASYNCHRONOUS CODE
  We can't write asynchronous code and side effects inside of the reducers, so we have to find another way to 
  send the http request to the server

  Our firebase back-end won't format the data for us, (just updating the product amount property
  if the product is already part of the cart) So we have to do that work here on the front-end.

  We can put the format data logic into the component, and then dispatching an action for reducer and 
  sending the http request all inside of the component, 
  in this way the component would become too large and the reducers wouldn't 
  contain the heavy code, and that's usually not a great way of doing this.

  The second approach is using useEffect in any place of our app (in this case I did it in the App component), 
  basically all we have to do is sending the http request when the cart data is changed. 
  So the data will be formatted correctly and after that the request will be done.
  But even then we have a lot of code in the component!

  The third approach is using Action Creators

*/
