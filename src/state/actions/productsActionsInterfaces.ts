import { ProductsActionTypes } from '../action-types';
import { Product } from '../../api-data-interfaces';

interface ProductsFetchRequest {
  type: ProductsActionTypes.PRODUCTS_FETCH_REQUEST;
}

interface ProductsFetchSuccess {
  type: ProductsActionTypes.PRODUCTS_FETCH_SUCCESS;
  payload: Product[];
}

interface ProductsFetchFail {
  type: ProductsActionTypes.PRODUCTS_FETCH_FAIL;
}

export type ProductsActionsInterface =
  | ProductsFetchRequest
  | ProductsFetchSuccess
  | ProductsFetchFail;
