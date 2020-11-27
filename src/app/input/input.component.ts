import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  width: number;
  cursorPosition: number;
  blinkInterval: number | undefined;
  cursorElement: HTMLElement;
  @Output() commandSubmit = new EventEmitter<string>();

  constructor() {
  }
  ngOnInit(): void {
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
      this.blinkInterval = window.setInterval(blink, 1000);
    }
  }
  onInput(e) {
    console.log(e.key);
    switch (e.keyCode) {
      case 13: {// Enter
        this.commandSubmit.emit(e.target.value);
        e.target.value = '';
        e.target.selectionStart = 0;
        break;
      }
      case 38: {// Arrow up
        break;
      }
      case 40: {// Arrow down
        break;
      }
      default:
        break;
    }
    this.updateCursorPos(e.target.selectionStart);
  }
  updateCursorPos(pos) {
    this.cursorBlink('stop');
    if (0 <= pos && pos <= this.width) {
      this.cursorPosition = pos - this.width;
    } else if (pos > this.width) {
      this.cursorPosition = 0;
    }
    console.log(this.cursorPosition);
    this.cursorBlink('start');
  }
  onClick(e) {
    this.updateCursorPos(e.target.selectionStart);
    const input = document.querySelector('#input').firstChild;
    input.focus();
  }
  focus(isFocused: boolean) {
    const cursor = document.querySelector('#cursor') as HTMLElement;
    if (!isFocused) {
      this.cursorBlink('stop');
    }
  }
}
