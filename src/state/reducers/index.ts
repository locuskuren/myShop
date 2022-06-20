import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { userReducer } from './userReducer';
import { cartReducer } from './cartReducer';
import { ordersReducer } from './orderReducer';
import { productsReducer } from './productsReducer';
import { singleProductReducer } from './singleProductReducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'cart'],
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  orders: ordersReducer,
  products: productsReducer,
  singleProduct: singleProductReducer,
});

const reducers = persistReducer(persistConfig, rootReducer);

export default reducers;

export type RootState = ReturnType<typeof reducers>;
