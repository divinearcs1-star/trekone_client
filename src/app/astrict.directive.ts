import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAstrict]'
})
export class AstrictDirective {

 
 constructor(private el: ElementRef, private renderer: Renderer2) {
 }

ngOnInit(): void {

    const span = this.renderer.createElement('span');

    const text = this.renderer.createText('*');

    this.renderer.appendChild(span, text);

    this.renderer.setStyle(span, 'color', 'red');
    this.renderer.setStyle(span, 'font-weight', 'bold');
    this.renderer.setStyle(span, 'font-size', '20px');

    this.renderer.appendChild(
      this.el.nativeElement,
      span
    );
  }

}
