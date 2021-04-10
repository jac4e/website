// Search's an array by key and string then returns all objects whose key matches the string

import { escapeIdentifier } from '@angular/compiler/src/output/abstract_emitter';

// Useful for matching path and commands to the proper object.
export let state = { location: '~' };

export function searchArray(arr: object[], key: string, str: string, all: boolean): any {
  const results = arr.filter((e) => {
    const dataToCheck = e[key];
    if (dataToCheck === undefined) {
      console.log('Array or key does not exist');
      return;
    }
    if (typeof dataToCheck === 'string') {
      return dataToCheck.toLowerCase() === str.toLowerCase();
    } else {
      return dataToCheck.some((o) => o.toLowerCase() === str.toLowerCase());
    }
  });
  return results;
}

export function parse(str: string): any {
  const array = str.split(' ');
  return { command: array.shift(), args: array.filter(Boolean) };
}

export const DIRECTORY = [
  {
    path: ['home', '~'],
    location: '~',
    url: ''
  },
  {
    path: ['about'],
    location: 'about',
    url: '/about'
  },
  {
    path: ['projects'],
    location: 'projects',
    url: '/projects'
  },
  {
    path: ['resume'],
    location: 'resume',
    url: '/resume'
  },
  {
    path: ['contact'],
    location: 'contact',
    url: '/contact'
  },
];

// Array of commands
// Each command is stored as an object with th properties "command, usage, desc, and func"
// Each func should return output for the console, either simple one line outputs to entire files to be served under the header

export const COMMANDS = [
  {
    name: 'cd',
    usage: '[path]',
    desc: 'changes current directory to [path] if specified, else returns to home directory',
    func(args: string[]) {
      console.log(args);
      if (args.length > 1) {
        return [``, 3];
      } else if (args.length === 0) {
        this.location = '~';
        this.router.navigateByUrl('');
        return ['', 2];
      } else {
        const result = searchArray(DIRECTORY, 'path', args[0], false);
        if (result.length > 0) {
          console.log(this);
          this.location = result[0].location;
          this.router.navigateByUrl(result[0].url);
          return ['', 2];
        } else {
          return [`${args[0]}`, 4];
        }
      }
    }
  },
  {
    name: 'help',
    usage: '[command]',
    desc: 'if [command] is specified it returns the usage and description of that command, else returns a list of available commands',
    func(args: string[]) {
      if (args.length === 0) {
        // Print all command descriptions as list
        let toPrint = 'available commands:\n';
        COMMANDS.forEach(command => {
          console.log(command);
          toPrint += command.name + '\t';
        });
        return [toPrint, 2];
      } else if (args.length === 1) {
        // Search command array for args[0]
        // Print command description if command is found
        const command = searchArray(COMMANDS, 'name', args[0], false)[0];
        console.log(command)
        return [`usage: ${command.name} ${command.usage}\ndescription: ${command.desc}`, 2];
      } else {
        // Print invalid arguments
        return [[''], 3];
      }
    }
  },
  {
    name: 'theme',
    usage: '[options] [theme]',
    desc: '[WIP] changes the current theme. use "theme --list" to list current available themes',
    func(args: string[]) {
      if (args[0]=='--list'){
        let toPrint = 'available themes:\n';
        THEMES.forEach(theme => {
          console.log(theme);
          toPrint += theme + '\t';
        });
        return [toPrint, 2];
      }
      if (args.length === 1) {
        if (THEMES.includes(args[0])){
          this.theme = args[0];
          return ['', 2];
        }
      } else {
        return ['', 3];
      }
    }
  }
];

const THEMES = ['slategray','classic','bright','rgb'];
