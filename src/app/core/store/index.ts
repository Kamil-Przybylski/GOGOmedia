import { Action, ActionReducerMap } from '@ngrx/store';
import { coreReducer, CoreState } from './core/core.reducer';

export interface AppState {
  core: CoreState;
}

export const reducers: ActionReducerMap<AppState, Action> = {
  core: coreReducer,
};
