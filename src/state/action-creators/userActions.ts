import { Dispatch } from 'redux';

import { myShopApi } from '../../api/myShopApi';
import { UserActionTypes } from '../action-types';
import { UserActionsInterfaces } from '../actions/userActionsInterfaces';
import { User } from '../../api-data-interfaces';

export const userLogin = (username: string, password: string) => {
  return async (dispatch: Dispatch<UserActionsInterfaces>) => {
    dispatch({ type: UserActionTypes.USER_LOGIN_REQUEST });

    try {
      const { data } = await myShopApi.post<User>('/auth/login', {
        username,
        password,
      });
      dispatch({ type: UserActionTypes.USER_LOGIN_SUCCESS, payload: data });
    } catch (err: any) {
      const message =
        err.response.data || 'unknown error, please try again or contact admin';
      dispatch({ type: UserActionTypes.USER_LOGIN_FAIL, payload: message });
    }
  };
};

export const userErrorReset = (): UserActionsInterfaces => {
  return { type: UserActionTypes.USER_ERROR_RESET };
};

export const userLogout = (): UserActionsInterfaces => {
  return {
    type: UserActionTypes.USER_LOGOUT,
  };
};

export const userRegister = (
  username: string,
  password: string,
  email: string
) => {
  return async (dispatch: Dispatch<UserActionsInterfaces>) => {
    dispatch({ type: UserActionTypes.USER_REGISTER_REQUEST });

    try {
      await myShopApi.post('auth/register', {
        username,
        password,
        email,
      });

      dispatch({ type: UserActionTypes.USER_REGISTER_SUCCESS });

      const { data } = await myShopApi.post<User>('/auth/login', {
        username,
        password,
      });

      dispatch({ type: UserActionTypes.USER_LOGIN_SUCCESS, payload: data });
    } catch (err: any) {
      let message = 'unknown error, please try again or contact admin';
      if (err.response.data.keyValue.username) {
        message = `user with username ${err.response.data.keyValue.username} already exists`;
      }
      if (err.response.data.keyValue.email) {
        message = `email adress ${err.response.data.keyValue.email} is already in use`;
      }

      dispatch({
        type: UserActionTypes.USER_REGISTER_FAIL,
        payload: message,
      });
    }
  };
};
