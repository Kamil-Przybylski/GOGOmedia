import { Action, combineReducers, createFeatureSelector } from '@ngrx/store';
import { authReducer, AuthState } from './auth/auth.reducer';

export interface CoreState {
  auth: AuthState;
}

export const coreReducer = combineReducers<CoreState, Action>({
  auth: authReducer,
});

export const getCoreModuleState = createFeatureSelector<CoreState>('core');
