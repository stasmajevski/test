import { createAction, props } from '@ngrx/store';

import { Stock } from '../../models/stock.model';

export const loadStocks = createAction('[Stock Component] Stocks Load');
export const loadedStocks = createAction('[Stocks Component] Stocks Load Success', props<{ stocks: Stock[] }>());
export const calculateStocks = createAction('[Stocks Component] Stocks Calculate');
export const calculatedStocks = createAction('[Stocks Component] Stocks Calculate Success', props<{ stocks: Stock[] }>());
