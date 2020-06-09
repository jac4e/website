import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  output: string;
  width: number;
  horzPosition: number;
  blinkInterval: number | undefined;
  cursorElement: HTMLElement;

  constructor() {
  }
  ngOnInit(): void {
    this.output = 'test';
    this.width = 21;
    this.horzPosition = -this.width;
  }
  cursorBlink(state: string){
    const cursor = document.querySelector('#cursor') as HTMLElement;
    function blink(): void{
      cursor.style.opacity = Math.abs(+cursor.style.opacity - 1).toString();
    }
    if (state === 'stop'){
      window.clearInterval(this.blinkInterval);
      cursor.style.opacity = (1).toString();
    } else if (state === 'start'){
      this.blinkInterval = window.setInterval(blink, 1100);
    }
  }
  onInput(e){
    this.updateCursorPos(e);
    this.output = e.target.value;
  }
  updateCursorPos(e){
    this.cursorBlink('stop');
    if (e.target.selectionStart <= 21){
      this.horzPosition = e.target.selectionStart - 21;
    } else if (e.target.selectionStart > 21){
      this.horzPosition = 0;
    }
    this.cursorBlink('start');
  }
  onClick(e){
    this.updateCursorPos(e);
    document.querySelector('#input').firstChild.focus();
  }
  focus(isFocused: boolean){
    const cursor = document.querySelector('#cursor') as HTMLElement;
    if (!isFocused){
      this.cursorBlink('stop');
    }
  }
}
