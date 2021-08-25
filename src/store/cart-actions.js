import { UIActions } from './UI-slice';
import { cartActions } from './cart-slice';
export function fetchCartData() {
  return async dispatch => {
    async function fetchData() {
      const response = await fetch(
        'https://food-order-a04c2-default-rtdb.firebaseio.com/cart.json'
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status} ${response.statusText}`);
      }

      const cartItems = await response.json();
      console.log(cartItems);
      return cartItems;
    }
    try {
      const cartItems = await fetchData();
      dispatch(cartActions.setCartData(cartItems || []));
    } catch (error) {
      dispatch(
        UIActions.showNotification({
          status: 'error',
          title: 'Something went wrong!',
          message: error.message,
        })
      );
    }
  };
}

export function sendCartData(cartItems) {
  return async dispatch => {
    dispatch(
      UIActions.showNotification({
        message: 'Please wait',
        title: 'Sending...',
        status: 'sending',
      })
    );

    async function sendRequest() {
      const response = await fetch(
        'https://food-order-a04c2-default-rtdb.firebaseio.com/cart.json',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cartItems),
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status} ${response.statusText}`);
      }
      return response;
    }

    try {
      const response = await sendRequest();
      dispatch(
        UIActions.showNotification({
          status: 'success',
          title: 'Item added to the cart!',
          message: response.statusText,
        })
      );
    } catch (error) {
      dispatch(
        UIActions.showNotification({
          status: 'error',
          title: 'Something went wrong!',
          message: error.message,
        })
      );
    }
  };
}
