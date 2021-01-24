import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { Stock } from '../../models/stock.model';
import { StockService } from '../../services/stock.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-stock-item]',
  templateUrl: './stock-item.component.html',
  styleUrls: ['../stocks/stocks.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class StockItemComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('app-stock-item') stock!: Stock;

  constructor(private stockService: StockService) {
  }

  ngOnInit(): void {
  }
  priceRaised(): boolean {
      return this.calculatePriceDifference() > 0;
  }
  calculatePriceDifference(): number {
    return this.stockService.calculatePriceDifference(this.stock);
  }
  calculatePriceDifferencePercentage(): number {
    return this.stockService.calculatePriceDifferencePercentage(this.stock);
  }
}
