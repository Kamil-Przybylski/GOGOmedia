import { createReducer, on } from '@ngrx/store';
import { AuthUser } from '../../../models/auth.models';
import { HttpState, initialHttpState } from '../../../models/http.models';
import {
  authInitialLoginAction,
  authInitialLoginFailAction,
  authInitialLoginSuccessAction,
  authLogoutAction,
  authSingInAction,
  authSingInFailAction,
  authSingInSuccessAction,
} from './auth.actions';

export interface AuthState {
  dataCondition: HttpState;
  initialLoginSuccess: boolean;
  authUser: AuthUser | null;
  token: string | null;
}

const initialState: AuthState = {
  dataCondition: initialHttpState,
  initialLoginSuccess: false,
  authUser: null,
  token: null,
};

export const authReducer = createReducer(
  initialState,
  on(authSingInAction, authInitialLoginAction, (state) =>
    Object.assign({}, state, {
      dataCondition: {
        isLoading: true,
        isSuccess: false,
        error: null,
      } as HttpState,
      authUser: null,
      token: null,
    } as AuthState)
  ),
  on(
    authSingInSuccessAction,
    authInitialLoginSuccessAction,
    (state, { payload }) =>
      Object.assign({}, state, {
        dataCondition: {
          isLoading: false,
          isSuccess: true,
          error: null,
        } as HttpState,
        authUser: payload?.authUser,
        token: payload?.token,
      } as AuthState)
  ),
  on(authSingInFailAction, authInitialLoginFailAction, (state, { payload }) =>
    Object.assign({}, state, {
      dataCondition: {
        isLoading: false,
        isSuccess: false,
        error: payload?.error,
      } as HttpState,
      authUser: null,
      token: null,
    } as AuthState)
  ),
  on(authLogoutAction, (state) => initialState)
);
