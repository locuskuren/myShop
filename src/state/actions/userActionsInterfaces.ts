import { User } from '../../api-data-interfaces';
import { UserActionTypes } from '../action-types';

interface UserLoginRequest {
  type: UserActionTypes.USER_LOGIN_REQUEST;
}

interface UserLoginSuccess {
  type: UserActionTypes.USER_LOGIN_SUCCESS;
  payload: User;
}

interface UserLoginFail {
  type: UserActionTypes.USER_LOGIN_FAIL;
  payload: string;
}

interface UserLoginReset {
  type: UserActionTypes.USER_LOGIN_RESET;
}

interface UserLogout {
  type: UserActionTypes.USER_LOGOUT;
}

interface UserRegisterRequest {
  type: UserActionTypes.USER_REGISTER_REQUEST;
}

interface UserRegisterSucess {
  type: UserActionTypes.USER_REGISTER_SUCCESS;
  payload: User;
}

interface UserRegisterFail {
  type: UserActionTypes.USER_REGISTER_FAIL;
  payload: string;
}

interface UserRegisterReset {
  type: UserActionTypes.USER_REGISTER_RESET;
}

export type UserActionsInterfaces =
  | UserLoginRequest
  | UserLoginSuccess
  | UserLoginFail
  | UserLogout
  | UserRegisterRequest
  | UserRegisterSucess
  | UserRegisterFail
  | UserRegisterReset
  | UserLoginReset;
