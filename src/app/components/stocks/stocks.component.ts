import { Component, OnInit } from '@angular/core';

import { Observable, timer } from 'rxjs';
import { Store } from '@ngrx/store';

import { Stock } from '../../models/stock.model';
import { StockService } from '../../services/stock.service';
import { incrementDay } from '../../state/actions/day-counter.actions';
import { loaded, loading } from '../../state/actions/loader.actions';
import { calculateStocks, loadStocks } from '../../state/actions/stock.actions';
import { State as DayAndDateState } from '../../state/reducers/day-counter.reducer';
import { State as LoaderState } from '../../state/reducers/loader.reducer';
import { State as StockState } from '../../state/reducers/stock.reducer';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css'],
})
export class StocksComponent implements OnInit {
  stocks: Stock[] = [];
  dayCount$: Observable<number> = this.store.select(stock => stock.dayAndDateState.dayCounter);
  date$: Observable<Date> = this.store.select(stock => stock.dayAndDateState.date);
  loader$: Observable<boolean> = this.store.select(stock => stock.loaderState.loader);
  stocks$: Observable<Stock[]> = this.store.select(state => state.stockState.stocks);

  constructor(
    private stockService: StockService,
    private store: Store<{stockState: StockState, dayAndDateState: DayAndDateState, loaderState: LoaderState }>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadStocks());
  }

  calculateCurrentPrice(): void {
    this.store.dispatch(loading());
    timer(600).subscribe(() => {
      this.store.dispatch(incrementDay());
      this.store.dispatch(calculateStocks());
      this.store.dispatch(loaded());
    });
  }
}
