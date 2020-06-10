import { Component, OnInit, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  output: string;
  width: number;
  cursorPosition: number;
  blinkInterval: number | undefined;
  cursorElement: HTMLElement;
  history: string[];

  constructor() {
  }
  ngOnInit(): void {
    this.output = 'test<br>';
    this.width = 21;
    this.cursorPosition = -this.width;
  }
  cursorBlink(state: string) {
    const cursor = document.querySelector('#cursor') as HTMLElement;
    function blink(): void {
      cursor.style.opacity = Math.abs(+cursor.style.opacity - 1).toString();
    }
    if (state === 'stop') {
      window.clearInterval(this.blinkInterval);
      cursor.style.opacity = (1).toString();
    } else if (state === 'start') {
      this.blinkInterval = window.setInterval(blink, 1100);
    }
  }
  onInput(e) {
    e.preventDefault();
    console.log(e.key);
    let selectionStart = e.target.selectionStart;
    let selectionEnd = e.target.selectionEnd;
    switch (e.keyCode) {
      case 8: {// Backspace
        if (selectionStart !== selectionEnd) {
          e.target.value = e.target.value.slice(0, selectionStart) + e.target.value.slice(selectionEnd);
          selectionEnd = selectionStart;
        } else if (selectionStart !== 0) {
          e.target.value = e.target.value.slice(0, selectionStart - 1) + e.target.value.slice(selectionEnd);
          selectionStart -= 1;
          selectionEnd -= 1;
        }
        break;
      }
      case 13: {// Enter
        this.output += e.target.value;
        e.target.value = '';
        selectionStart = 0;
        break;
      }
      case 37: {// Arrow left
        if (e.shiftKey){
          selectionStart -= 1;
        } else if (selectionStart !== selectionEnd){
          selectionEnd = selectionStart;
        } else {
          selectionStart -= 1;
          selectionEnd -= 1;
        }
        break;
      }
      case 38: {// Arrow up
        break;
      }
      case 39: {// Arrow right
        if (e.shiftKey){
          selectionEnd += 1;
        } else if (selectionStart !== selectionEnd){
          selectionStart = selectionEnd;
        } else {
          selectionStart += 1;
          selectionEnd += 1;
        }
        break;
      }
      case 40: {// Arrow down
        break;
      }
      default:
        // Handle all character keys
        if (e.key.length === 1 && e.target.value.length < this.width) {
          if (selectionStart === selectionEnd) {
            e.target.value = e.target.value.slice(0, selectionStart) + e.key + e.target.value.slice(selectionStart);
            selectionStart += 1;
            selectionEnd += 1;
          } else {
            e.target.value = e.target.value.replace(e.target.value.slice(selectionStart, selectionEnd), e.key);
            selectionStart += 1;
            selectionEnd = selectionStart;
          }
        }
    }
    // Selection position verification
    if (selectionStart > e.target.value.length){
      selectionStart = e.target.value.length;
    }
    if (selectionEnd > e.target.value.length){
      selectionEnd = e.target.value.length;
    }
    if (selectionStart < 0 ){
      selectionStart = 0;
    }
    if (selectionEnd < 0 ){
      selectionEnd = 0;
    }
    this.updateCursorPos(selectionStart);
    e.target.selectionStart = selectionStart;
    e.target.selectionEnd = selectionEnd;
  }
  updateCursorPos(pos) {
    this.cursorBlink('stop');
    if (0 <= pos && pos <= this.width) {
      this.cursorPosition = pos - this.width;
    } else if (pos > this.width) {
      this.cursorPosition = 0;
    }
    this.cursorBlink('start');
  }
  onClick(e) {
    this.updateCursorPos(e.target.selectionStart);
    document.querySelector('#input').firstChild.focus();
  }
  focus(isFocused: boolean) {
    const cursor = document.querySelector('#cursor') as HTMLElement;
    if (!isFocused) {
      this.cursorBlink('stop');
    }
  }
}
