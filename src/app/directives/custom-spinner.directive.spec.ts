import { CustomSpinnerDirective } from './custom-spinner.directive';
import { ElementRef } from '@angular/core';

describe('CustomSpinnerDirective', () => {
  it('should create an instance', () => {
    const elem = ElementRef;
    const directive = new CustomSpinnerDirective(elem.prototype);
    expect(directive).toBeTruthy();
  });
});
