import { OrderActionTypes } from '../action-types';
import { Order } from '../../api-data-interfaces';

interface OrdersFetchRequest {
  type: OrderActionTypes.ORDERS_FETCH_REQUEST;
}

interface OrdersFetchSucess {
  type: OrderActionTypes.ORDERS_FETCH_SUCCESS;
  payload: Order[];
}

interface OrdersFetchFail {
  type: OrderActionTypes.ORDERS_FETCH_FAIL;
}

export type OrderActionsInterface =
  | OrdersFetchRequest
  | OrdersFetchSucess
  | OrdersFetchFail;
