import produce from 'immer';
import { Reducer } from 'redux';

import { Product } from '../../api-data-interfaces';
import { ProductsActionTypes } from '../action-types';
import { ProductsActionsInterface } from '../actions';

interface ProductsState {
  products: Product[] | null;
  loading: boolean;
  error: boolean;
}

const initialState = {
  products: null,
  loading: false,
  error: false,
};

export const productsReducer: Reducer<ProductsState, ProductsActionsInterface> =
  produce(
    (
      state: ProductsState = initialState,
      action: ProductsActionsInterface
    ): ProductsState => {
      switch (action.type) {
        case ProductsActionTypes.PRODUCTS_FETCH_REQUEST:
          state.loading = true;
          return state;
        case ProductsActionTypes.PRODUCTS_FETCH_SUCCESS:
          state.loading = false;
          state.products = action.payload;
          return state;
        case ProductsActionTypes.PRODUCTS_FETCH_FAIL:
          state.loading = false;
          state.error = true;
          return state;
        case ProductsActionTypes.PRODUCTS_RESET:
          return initialState;
        default:
          return state;
      }
    }
  );
