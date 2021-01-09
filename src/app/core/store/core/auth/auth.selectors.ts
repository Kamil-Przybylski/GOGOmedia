import { createSelector } from '@ngrx/store';
import { getCoreModuleState } from '../core.reducer';

export const getAuthState = createSelector(
  getCoreModuleState,
  (state) => state.auth
);

export const getAuthUser = createSelector(
  getAuthState,
  (state) => state.authUser
);

export const getAuthToken = createSelector(
  getAuthState,
  (state) => state.token
);

export const getAuthDataCondition = createSelector(
  getAuthState,
  (state) => state.dataCondition
);

export const getAuthIsLoading = createSelector(
  getAuthDataCondition,
  (dataCondition) => dataCondition.isLoading
);

export const getAuthIsSuccess = createSelector(
  getAuthDataCondition,
  (dataCondition) => dataCondition.isSuccess
);

export const getAuthIsProcessing = createSelector(
  getAuthIsLoading,
  getAuthIsSuccess,
  (isLoading, isSuccess) => isLoading || isSuccess
);

export const getAuthSingInError = createSelector(
  getAuthDataCondition,
  (dataCondition) => dataCondition.error
);
