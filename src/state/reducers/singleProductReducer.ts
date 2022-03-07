import produce from 'immer';
import { Reducer } from 'redux';

import { Product } from '../../api-data-interfaces';
import { SingleProductActionTypes } from '../action-types';
import { SingleProductActionsInterface } from '../actions';

interface SingleProductState {
  product: Product | null;
  loading: boolean;
  error: boolean;
}

const initialState = {
  product: null,
  loading: false,
  error: false,
};

export const singleProductReducer: Reducer<
  SingleProductState,
  SingleProductActionsInterface
> = produce(
  (
    state: SingleProductState = initialState,
    action: SingleProductActionsInterface
  ): SingleProductState => {
    switch (action.type) {
      case SingleProductActionTypes.SINGLE_PRODUCT_FETCH_REQUEST:
        state.loading = true;
        state.error = false;
        return state;
      case SingleProductActionTypes.SINGLE_PRODUCT_FETCH_SUCESS:
        state.loading = false;
        state.product = action.payload;
        return state;
      case SingleProductActionTypes.SINGLE_PRODUCT_FETCH_FAIL:
        state.loading = false;
        state.error = true;
        return state;
      case SingleProductActionTypes.SINGLE_PRODUCT_RESET:
        return initialState;
      default:
        return state;
    }
  }
);
