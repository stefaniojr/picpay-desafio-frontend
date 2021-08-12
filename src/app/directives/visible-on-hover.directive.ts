import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appVisibleOnHover]'
})
export class VisibleOnHoverDirective {


  @Input('appVisibleOnHover') isMobileDevice: boolean

  constructor(private element: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseover')
  visible() {
    this.setElementDisplayStyleProperty('block')
  }

  @HostListener('mouseleave')
  hide() {
    if (!this.isMobileDevice)
      this.setElementDisplayStyleProperty('none')
  }

  setElementDisplayStyleProperty = (display: string) => {
    const lastIndex = this.element.nativeElement.children.length - 1
    this.renderer.setStyle(this.element.nativeElement.children[lastIndex].children[0], 'display', display)
  }

}
