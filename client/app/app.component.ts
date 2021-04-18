import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { InputComponent } from './input/input.component';
import { state, searchArray, parse, DIRECTORY, COMMANDS } from './console';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements AfterViewInit {
  @ViewChild(InputComponent) userinput;
  location = '~';
  constructor(private router: Router) {
    router.events.subscribe((event) => {
      // see also 
      if (event instanceof NavigationEnd) {
        if (window.location.pathname === '/') {
          this.location = '~';
        } else {
          this.location = '~' + window.location.pathname;
        }
      }
    });
  }
  title = 'website';
  theme = "slategray"
  command: string;
  output = 'Click the square and try \'help\'...';
  ngAfterViewInit() {
  }
  onCommand(e) {
    // Need to add basic error handling here.
    this.command = e;
    // Parse command into command and argument
    const parsed = parse(this.command);
    const command = searchArray(COMMANDS, 'name', parsed.command, false);
    if (command.length === 0) {
      this.output = `${parsed.command}: command not found: see 'help' for list of commands\n`;
    } else {
      const bindedFunc = command[0].func.bind(this);
      const funcResults = bindedFunc(parsed.args);
      switch (funcResults[1]) {
        case 2: {
          // ok
          this.output = funcResults[0];
          break;
        }
        case 3: {
          // incorrect usage
          this.output = `${command[0].name}: invalid arguments: see 'help ${command[0].name}' for correct usage`;
          break;
        }
        case 4: {
          // Custom error
          this.output = `${command[0].name}: ${funcResults[0]}`;
          break;
        }
      }
    }
    // Update Console State
    let content = document.querySelector('.scrollable') as HTMLElement;
    content.scrollTop = 0;
  }
}