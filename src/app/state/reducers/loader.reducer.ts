import { Action, createReducer, on } from '@ngrx/store';

import { loaded, loading } from '../actions/loader.actions';

export interface State {
  loader: boolean;
}

export const initialState: State = {
  loader: false,
};

const loaderReducer = createReducer(
  initialState,
  on(loading, state => ({ ...state, loader: true})),
  on(loaded, state => ({ ...state, loader: false})),
);

export function reducer(state: State | undefined, action: Action): State {
  return loaderReducer(state, action);
}

