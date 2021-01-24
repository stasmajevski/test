import { Directive, Input, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appCustomSpinnerDirective]'
})
export class CustomSpinnerDirective implements AfterViewInit{

  @Input() color: string | undefined;

  constructor(
    private elem: ElementRef
  ){}

  ngAfterViewInit(): void {
    this.elem.nativeElement.querySelector('circle').style.stroke = this.color;
  }
}
