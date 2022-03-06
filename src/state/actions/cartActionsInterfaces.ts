import { CartProduct } from '../../api-data-interfaces';
import { CartActionTypes } from '../action-types';

interface CartAddProduct {
  type: CartActionTypes.CART_ADD_PRODUCT;
  payload: CartProduct;
}

interface CartRemoveItem {
  type: CartActionTypes.CART_REMOVE_ITEM;
  payload: CartProduct;
}

interface CartClearItems {
  type: CartActionTypes.CART_CLEAR_ITEMS;
}

interface CartIncreaseItemQuantity {
  type: CartActionTypes.CART_INCREASE_ITEM_QUANTITY;
  payload: string;
}

interface CartDecreaseItemQuantity {
  type: CartActionTypes.CART_DECREASE_ITEM_QUANTITY;
  payload: string;
}

export type CartActionsInterfaces =
  | CartAddProduct
  | CartClearItems
  | CartRemoveItem
  | CartIncreaseItemQuantity
  | CartDecreaseItemQuantity;
