import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { Stock } from '../models/stock.model';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  constructor(private http: HttpClient) {
  }

  getStocks(): Observable<Stock[]> {
    return this.http.get<Stock[]>('https://staging-api.brainbase.com/stocks.php').pipe(
      tap((stocks: Stock[]) => stocks.forEach((stock) => {
        stock.currentPrice = stock.price * this.generatePriceChangePercentage() / 100 + stock.price;
      }))
    );
  }
  calculateCurrentPrice(stocks: Observable<Stock[]>): Observable<Stock[]> {
    return stocks.pipe(
      take(1),
      map((stocksArr: Stock[]) => stocksArr.map(stock => ({
        ...stock,
        currentPrice: stock.currentPrice * this.generatePriceChangePercentage() / 100 + stock.currentPrice
      })))
    );
  }
  calculatePriceDifference(stock: Stock): number {
    return stock.currentPrice - stock.price;
  }
  calculatePriceDifferencePercentage(stock: Stock): number {
    return (this.calculatePriceDifference(stock)) / stock.price;
  }
  generatePriceChangePercentage(): number {
    const min = -10;
    const max = 10;
    return Math.random() * (max - min) + min;
  }
}
