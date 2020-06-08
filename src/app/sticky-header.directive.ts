import { Directive, HostListener, Input, ElementRef, Renderer2, ɵConsole } from '@angular/core';

@Directive({
  selector: '[appStickyHeader]'
})
export class StickyHeaderDirective {
  @HostListener('resize', ['$event'])
  @HostListener('scroll', ['$event'])
  public onEvent(event) {
    const element = this.el.nativeElement;
    const header = this.el.nativeElement.firstChild;
    const content = this.el.nativeElement.children[1];
    const footer = this.el.nativeElement.lastChild;
    const headerBreakpoint = Math.round(document.documentElement.clientHeight * 0.40);
    console.log(element.offsetHeight - element.offsetTop);
    if (element.scrollTop > headerBreakpoint) {
      header.className = 'stuck header row';
      element.style.marginTop = header.offsetHeight + 'px';
    } else {
      header.className = 'header row';
      element.style.marginTop = 0 + 'px';
    }
    // if (header.offsetTop > breakpoint) {
    //   header.style.backgroundAttachment = 'scroll';
    //   header.style.backgroundPosition = `${-header.offsetLeft}px ${-header.offsetTop + this.el.nativeElement.scrollTop}px`;
    //   header.style.backgroundPosition = `${-header.offsetLeft}px ${-header.offsetTop + this.el.nativeElement.scrollTop}px`;
     // content.
    //   header.style.position = 'absolute';
    //   header.style.top = '0';
    //   header.style.marginTop = '0vh';
    //   this.el.nativeElement.style.height = document.documentElement.clientHeight * 1 - footer.offsetHeight - header.offsetHeight + 'px';
      // this.el.nativeElement.style.marginTop = header.offsetHeight + 'px';
    // } else {
    //   header.style.backgroundAttachment = 'inherit';
    //   footer.style.background = 'unset';
    //   header.style.position = 'initial';
    //   header.style.top = 'initial';
    //   header.style.marginTop = '40vh';
    //   this.el.nativeElement.style.height = document.documentElement.clientHeight * 1 - footer.offsetHeight + 'px';
      // this.el.nativeElement.style.marginTop = 'initial';
    // }
  }
  constructor(private el: ElementRef) { }
}
