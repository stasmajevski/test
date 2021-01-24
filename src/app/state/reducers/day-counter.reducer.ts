import { Action, createReducer, on } from '@ngrx/store';

import { incrementDay } from '../actions/day-counter.actions';

export interface State {
  dayCounter: number;
  date: Date;
}

export const initialState: State = {
  dayCounter: 1,
  date: new Date(),
};

const dayAndDateReducer = createReducer(
  initialState,
  on(incrementDay, state => ({ ...state, dayCounter: state.dayCounter + 1, date: new Date(state.date.setDate(state.date.getDate() + 1))})),
);

export function reducer(state: State | undefined, action: Action): State {
  return dayAndDateReducer(state, action);
}

