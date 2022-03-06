import produce from 'immer';
import { Reducer } from 'redux';

import { Order } from '../../api-data-interfaces';
import { OrderActionTypes } from '../action-types';
import { OrderActionsInterface } from '../actions';

interface OrdersState {
  orders: Order[];
  loading: boolean;
  error: boolean;
}

const initialState: OrdersState = {
  orders: [],
  loading: false,
  error: false,
};

export const ordersReducer: Reducer<OrdersState, OrderActionsInterface> =
  produce(
    (
      state: OrdersState = initialState,
      action: OrderActionsInterface
    ): OrdersState => {
      switch (action.type) {
        case OrderActionTypes.ORDERS_FETCH_REQUEST:
          state.loading = true;
          return state;
        case OrderActionTypes.ORDERS_FETCH_SUCCESS:
          state.loading = false;
          state.orders = action.payload;
          return state;
        case OrderActionTypes.ORDERS_FETCH_FAIL:
          state.loading = false;
          state.error = true;
          return state;
        default:
          return state;
      }
    }
  );
