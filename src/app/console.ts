// Search's an array by key and string then returns all objects whose key matches the string
// Useful for matching path and commands to the proper object.
function searchArray(arr: object[], key: string, str: string, all: boolean): any {
    const results = arr.filter( (e) => {
      const dataToCheck = e[key];
      if (dataToCheck === undefined){
        console.log('Array or key does not exist');
        return;
      }
      if (typeof dataToCheck === 'string'){
        return dataToCheck.toLowerCase() === str.toLowerCase();
      } else {
        return dataToCheck.some( (o) => o.toLowerCase() === str.toLowerCase() );
      }
    });
    return results;
}

export const DIRECTORY = [
  {
    path: '',
    location: ''
  },
];

// Array of commands
// Each command is stored as an object with th properties "command, usage, desc, and func"
// Each func should return output for the console, either simple one line outputs to entire files to be served under the header

export const COMMANDS = [
    {
        command: 'cd',
        usage: 'cd [path]',
        desc: 'changes current directory to [path]',
        func: (args: string[]) => {
          if (args.length > 1){
            // Print invalid arguments
          } else if (args[0] === '-h') {
            // Print description
          }
        }
    },
    {
        command: 'help',
        usage: 'help [command]',
        desc: 'returns a list of all available commands when a command is not specified, else returns the usage and description of the provided command',
        func: (args: string[]) => {
            if (args.length === 0){
              // Print all command descriptions as list
            } else if (args.length === 1) {
              // Search command array for args[0]
              // Print command description if command is found
            } else {
              // Print invalid arguments
            }
            return;
        }
    },
];
