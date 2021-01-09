import { createAction, props } from '@ngrx/store';
import { AuthUser, FormSignInModel } from '../../../models/auth.models';
import { HttpErrorData } from '../../../models/http.models';

// actions when user submit credentials
export const authSingInAction = createAction(
  '[Auth] Sing In Action',
  props<{ payload: { formModel: FormSignInModel } }>()
);
export const authSingInSuccessAction = createAction(
  '[Auth] Sing In Success',
  props<{ payload: { authUser: AuthUser; token: string } }>()
);
export const authSingInFailAction = createAction(
  '[Auth] Sing In Fail',
  props<{ payload: { error: HttpErrorData } }>()
);

// actions when APP_INITIALIZER submit credentials from token
export const authInitialLoginAction = createAction(
  '[Auth] Initial Login Action',
  props<{ payload: { token: string } }>()
);
export const authInitialLoginSuccessAction = createAction(
  '[Auth] Initial Login Success Action',
  props<{ payload: { authUser: AuthUser; token: string } }>()
);
export const authInitialLoginFailAction = createAction(
  '[Auth] Initial Login Fail Action',
  props<{ payload: { error: HttpErrorData } }>()
);

export const authLogoutAction = createAction('[Auth] Logout Action');
