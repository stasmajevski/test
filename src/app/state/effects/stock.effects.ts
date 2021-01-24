import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';

import { StockService } from '../../services/stock.service';
import { calculatedStocks, calculateStocks, loadedStocks, loadStocks } from '../actions/stock.actions';
import { State as StockState } from '../../state/reducers/stock.reducer';


@Injectable()
export class StockEffects {
  loadStocks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadStocks),
      mergeMap(() => this.stockService.getStocks()
        .pipe(
          map(stocks => loadedStocks({stocks})),
        )
      )
    )
  );

  calculateStocks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(calculateStocks),
      mergeMap(() => this.stockService.calculateCurrentPrice(this.store.select(state => state.stockState.stocks))
        .pipe(
          map(stocks => calculatedStocks({stocks})),
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private stockService: StockService,
    private store: Store<{stockState: StockState}>
  ) {}
}
