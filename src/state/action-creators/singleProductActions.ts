import { Dispatch } from 'redux';

import { myShopApi } from '../../api/myShopApi';
import { SingleProductActionTypes } from '../action-types';
import { SingleProductActionsInterface } from '../actions';
import { Product } from '../../api-data-interfaces';

export const fetchSingleProduct = (id: string) => {
  return async (dispatch: Dispatch<SingleProductActionsInterface>) => {
    dispatch({ type: SingleProductActionTypes.SINGLE_PRODUCT_FETCH_REQUEST });
    try {
      const { data } = await myShopApi.get<Product>(`/products/find/${id}`);

      setTimeout(
        () =>
          dispatch({
            type: SingleProductActionTypes.SINGLE_PRODUCT_FETCH_SUCESS,
            payload: data,
          }),
        50
      );
    } catch (error) {
      dispatch({
        type: SingleProductActionTypes.SINGLE_PRODUCT_FETCH_FAIL,
      });
    }
  };
};

export const singleProductReset = (): SingleProductActionsInterface => {
  return { type: SingleProductActionTypes.SINGLE_PRODUCT_RESET };
};
