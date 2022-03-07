import { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import { myShopApi } from '../../api/myShopApi';
import { useSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';

import './Cart.scss';

const Cart: React.FC = () => {
  const cart = useSelector((state) => state.cart);
  const userId = useSelector((state) => state.user.currentUser?._id);
  const token = useSelector((state) => state.user.currentUser?.accessToken);
  const {
    cartClearItems,
    cartDecreaseItemQuantity,
    cartIncreaseItemQuantity,
    cartRemoveItem,
  } = useActions();
  const [stripeToken, setStripeToken] = useState('');
  const [error, setError] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  let cartItemsQuantity = 0;
  if (cart?.items !== undefined) {
    cart.items.forEach((item) => (cartItemsQuantity += item.quantity));
  }
  const KEY = process.env.REACT_APP_STRIPE || '';

  const amount = cart?.totalPrice ? cart.totalPrice * 100 : 0;

  const onToken = (stripeToken: { id: string }) => {
    setStripeToken(stripeToken.id);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (cart.totalPrice > 0 && userId && stripeToken !== '') {
      const request = async () => {
        try {
          setError(false);

          const products = cart.items.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
          }));

          const dataToSend = {
            products,
            amount: cart.totalPrice,
            address: 'n/a',
            userId,
          };

          const header = { token: `Bearer ${token}` };

          await myShopApi.post('/orders', dataToSend, {
            headers: header,
          });

          setShowMessage(true);
          cartClearItems();
          setStripeToken('');
        } catch (err) {
          setError(true);
          setStripeToken('');
          console.log(err);
        }
      };
      request();
    }
  }, [
    stripeToken,
    cart?.items,
    cart?.totalPrice,
    token,
    userId,
    cartClearItems,
    error,
    cart,
  ]);

  return (
    <div className="cart">
      <h1>Checkout</h1>
      <div className="cart-container">
        <div className="product-list">
          {cart.items.map((item) => (
            <div className="product-details" key={item._id}>
              <img src={item.image} alt={item.title} />
              <div className="product-description">
                <span className="item-title">{item.title}</span>
                <div>
                  <RemoveIcon
                    onClick={() => {
                      if (item.quantity > 1) {
                        cartDecreaseItemQuantity(item._id);
                      }
                    }}
                    style={{ color: 'red', cursor: 'pointer' }}
                  />
                  <span>{item.quantity}</span>
                  <AddIcon
                    onClick={() => cartIncreaseItemQuantity(item._id)}
                    style={{ color: 'green', cursor: 'pointer' }}
                  />
                </div>
                <span className="item-price">
                  ${Math.round(item.price * item.quantity * 100) / 100}
                </span>
                <span
                  onClick={() => cartRemoveItem(item)}
                  style={{ color: 'red', cursor: 'pointer' }}
                >
                  ✕
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="checkout">
          <div className="promo">
            <input placeholder="Gift card or discount code" type="text" />
            <button disabled={true}>Apply</button>
          </div>
          <div className="price">
            <div className="left">
              <span>Subtotal</span>
              <span>Shipping</span>
            </div>
            <div className="right">
              <span>${Math.round(cart.totalPrice * 100) / 100}</span>
              <span>$7.99</span>
            </div>
          </div>
          <div className="total-price">
            <span className="left">
              <span>Total</span>
            </span>
            <span className="right">
              <span>${Math.round((cart.totalPrice + 7.99) * 100) / 100}</span>
            </span>
          </div>
          <StripeCheckout
            name="myShop"
            image="https://i.ibb.co/bBnHDL3/logo512.png"
            billingAddress
            shippingAddress
            description={`Your total is $${cart?.totalPrice}`}
            amount={amount}
            token={onToken}
            stripeKey={KEY}
          >
            <button className="checkout-button" disabled={!userId}>
              Check out
            </button>
            <h2 className="card-details">
              CARD DETAILS: 4242 4242 4242 4242 09/23 123
            </h2>
            {error && (
              <h2 style={{ color: 'red', marginTop: '10px' }}>
                SOMETHING WENT WRONG, PLEASE TRY AGAIN OR CONTACT ADMIN
              </h2>
            )}
            {showMessage && (
              <span className="checkout-message">
                Thank you, order has been recieved
              </span>
            )}
          </StripeCheckout>
        </div>
      </div>
    </div>
  );
};

export default Cart;
