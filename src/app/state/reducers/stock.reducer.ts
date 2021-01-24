import { createReducer, on } from '@ngrx/store';

import { calculatedStocks, loadedStocks } from '../actions/stock.actions';
import { Stock } from '../../models/stock.model';

export interface State {
  stocks: Stock[];
}

export const initialState: State = {
  stocks: [],
};

export const stocksReducer = createReducer(
  initialState,
  on(loadedStocks, (state, { stocks }) => ({ stocks })),
  on(calculatedStocks, (state, { stocks }) => ({ stocks})),
);


