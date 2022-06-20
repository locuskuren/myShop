import produce from 'immer';
import { Reducer } from 'redux';

import { User } from '../../api-data-interfaces';
import { UserActionsInterfaces } from '../actions/userActionsInterfaces';
import { UserActionTypes } from '../action-types';

interface UserState {
  currentUser: User | null;
  loading: boolean;
  error: string;
}

const initialState = {
  currentUser: null,
  loading: false,
  error: '',
};

export const userReducer: Reducer<UserState, UserActionsInterfaces> = produce(
  (state: UserState = initialState, action: UserActionsInterfaces) => {
    switch (action.type) {
      case UserActionTypes.USER_LOGIN_REQUEST:
        state.loading = true;
        state.error = '';
        return state;
      case UserActionTypes.USER_LOGIN_SUCCESS:
        state.loading = false;
        state.currentUser = action.payload;
        return state;
      case UserActionTypes.USER_LOGIN_FAIL:
        state.loading = false;
        state.error = action.payload;
        return state;
      case UserActionTypes.USER_LOGIN_ERROR_RESET:
        state.error = '';
        state.loading = false;
        return state;
      case UserActionTypes.USER_LOGOUT:
        state = initialState;
        return state;
      default:
        return state;
    }
  }
);

export const userRegisterReducer: Reducer<UserState, UserActionsInterfaces> =
  produce((state: UserState = initialState, action: UserActionsInterfaces) => {
    switch (action.type) {
      case UserActionTypes.USER_REGISTER_REQUEST:
        state.loading = true;
        return state;
      case UserActionTypes.USER_REGISTER_SUCCESS:
        state.loading = false;
        state.currentUser = action.payload;
        return state;
      case UserActionTypes.USER_REGISTER_FAIL:
        state.loading = false;
        state.error = action.payload;
        return state;
      case UserActionTypes.USER_REGISTER_RESET:
        state = initialState;
        return state;
      default:
        return state;
    }
  });
