import { CartProduct } from '../../api-data-interfaces';
import { CartActionTypes } from '../action-types';
import { CartActionsInterfaces } from '../actions';

export const cartAddProduct = (
  cartProduct: CartProduct
): CartActionsInterfaces => {
  return {
    type: CartActionTypes.CART_ADD_PRODUCT,
    payload: cartProduct,
  };
};

export const cartRemoveItem = (
  cartProduct: CartProduct
): CartActionsInterfaces => {
  return {
    type: CartActionTypes.CART_REMOVE_ITEM,
    payload: cartProduct,
  };
};

export const cartClearItems = (): CartActionsInterfaces => {
  return {
    type: CartActionTypes.CART_CLEAR_ITEMS,
  };
};

export const cartIncreaseItemQuantity = (
  _id: string
): CartActionsInterfaces => {
  return {
    type: CartActionTypes.CART_INCREASE_ITEM_QUANTITY,
    payload: _id,
  };
};

export const cartDecreaseItemQuantity = (
  _id: string
): CartActionsInterfaces => {
  return {
    type: CartActionTypes.CART_DECREASE_ITEM_QUANTITY,
    payload: _id,
  };
};
