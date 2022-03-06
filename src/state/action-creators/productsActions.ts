import { Dispatch } from 'redux';

import { myShopApi } from '../../api/myShopApi';
import { ProductsActionTypes } from '../action-types';
import { ProductsActionsInterface } from '../actions';
import { Product } from '../../api-data-interfaces';

export const fetchProducts = () => {
  return async (dispatch: Dispatch<ProductsActionsInterface>) => {
    dispatch({ type: ProductsActionTypes.PRODUCTS_FETCH_REQUEST });
    try {
      const { data } = await myShopApi.get<Product[]>(`/products`);

      dispatch({
        type: ProductsActionTypes.PRODUCTS_FETCH_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ProductsActionTypes.PRODUCTS_FETCH_FAIL,
      });
    }
  };
};

export const productsReset = (): ProductsActionsInterface => {
  return { type: ProductsActionTypes.PRODUCTS_RESET };
};
