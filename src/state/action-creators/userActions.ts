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

export const userLoginReset = (): UserActionsInterfaces => {
  return { type: UserActionTypes.USER_LOGIN_RESET };
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
      const { data } = await myShopApi.post<User>('auth/register', {
        username,
        password,
        email,
      });

      dispatch({ type: UserActionTypes.USER_REGISTER_SUCCESS, payload: data });

      dispatch({ type: UserActionTypes.USER_REGISTER_RESET });
    } catch (err: any) {
      let message: string = 'unknown error, please try again or contact admin';
      if (err.response.data.keyValue.userName) {
        message = `user with username ${err.response.data.keyValue.userName} already exists`;
      }
      if (err.response.data.keyValue.email) {
        message = `user with username ${err.response.data.keyValue.email} already exists`;
      }

      dispatch({
        type: UserActionTypes.USER_REGISTER_FAIL,
        payload: message,
      });
    }
  };
};

export const userRegisterReset = (): UserActionsInterfaces => {
  return { type: UserActionTypes.USER_REGISTER_RESET };
};
