import produce from 'immer';
import { Reducer } from 'redux';

import { CartProduct } from '../../api-data-interfaces';
import { CartActionTypes } from '../action-types';
import { CartActionsInterfaces } from '../actions';

interface CartState {
  items: CartProduct[];
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalPrice: 0,
};

export const cartReducer: Reducer<CartState, CartActionsInterfaces> = produce(
  (
    state: CartState = initialState,
    action: CartActionsInterfaces
  ): CartState => {
    switch (action.type) {
      case CartActionTypes.CART_ADD_PRODUCT:
        if (state.items.find((item) => item._id === action.payload._id)) {
          state.items[
            state.items.findIndex((item) => item._id === action.payload._id)
          ].quantity += action.payload.quantity;
        } else {
          state.items.push(action.payload);
        }
        state.totalPrice = state.items
          .map((item) => item.price * item.quantity)
          .reduce(
            (previousValue, currentValue) => previousValue + currentValue
          );

        return state;
      case CartActionTypes.CART_REMOVE_ITEM:
        if (state.items.length === 1) {
          state.items = [];
          state.totalPrice = 0;
        } else {
          state.items = state.items.filter(
            (item) => item._id !== action.payload._id
          );

          state.totalPrice = state.items
            .map((item) => item.price * item.quantity)
            .reduce(
              (previousValue, currentValue) => previousValue + currentValue
            );
        }
        return state;
      case CartActionTypes.CART_CLEAR_ITEMS:
        return initialState;
      case CartActionTypes.CART_INCREASE_ITEM_QUANTITY:
        state.items[
          state.items.findIndex((item) => item._id === action.payload)
        ].quantity += 1;
        state.totalPrice = state.items
          .map((item) => item.price * item.quantity)
          .reduce(
            (previousValue, currentValue) => previousValue + currentValue
          );

        return state;
      case CartActionTypes.CART_DECREASE_ITEM_QUANTITY:
        state.items[
          state.items.findIndex((item) => item._id === action.payload)
        ].quantity -= 1;
        state.totalPrice = state.items
          .map((item) => item.price * item.quantity)
          .reduce(
            (previousValue, currentValue) => previousValue + currentValue
          );

        return state;
      default:
        return state;
    }
  }
);
