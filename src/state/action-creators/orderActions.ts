import { Dispatch } from 'redux';

import { myShopApi } from '../../api/myShopApi';
import { OrderActionTypes } from '../action-types';
import { OrderActionsInterface } from '../actions';
import { Order } from '../../api-data-interfaces';
import { RootState } from '..';

export const fetchOrders = (_id: string) => {
  return async (
    dispatch: Dispatch<OrderActionsInterface>,
    getState: () => RootState
  ) => {
    dispatch({ type: OrderActionTypes.ORDERS_FETCH_REQUEST });
    try {
      const state = getState();
      const token = state.user?.currentUser?.accessToken;
      const { data } = await myShopApi.get<Order[]>(`orders/find/${_id}`, {
        headers: { token: `Bearer ${token}` },
      });

      dispatch({
        type: OrderActionTypes.ORDERS_FETCH_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: OrderActionTypes.ORDERS_FETCH_FAIL,
      });
    }
  };
};
