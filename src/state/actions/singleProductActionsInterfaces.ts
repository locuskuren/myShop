import { Product } from '../../api-data-interfaces';
import { SingleProductActionTypes } from '../action-types';

interface SingleProductFetchRequest {
  type: SingleProductActionTypes.SINGLE_PRODUCT_FETCH_REQUEST;
}

interface SingleProductFetchSuccess {
  type: SingleProductActionTypes.SINGLE_PRODUCT_FETCH_SUCESS;
  payload: Product;
}

interface SingleProductFetchFail {
  type: SingleProductActionTypes.SINGLE_PRODUCT_FETCH_FAIL;
}

interface SingleProductReste {
  type: SingleProductActionTypes.SINGLE_PRODUCT_RESET;
}

export type SingleProductActionsInterface =
  | SingleProductFetchRequest
  | SingleProductFetchSuccess
  | SingleProductFetchFail
  | SingleProductReste;
