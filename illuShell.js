const spaces = (times) => ' '.repeat(times);

const pwd = function (args) {
  if (args.length === 0) {
    return 'User/' + path.slice(1).join('/');
  }

  return 'Error: Arguments not recognized';
};

const echo = (args) => args.join(' ');

const getDirContents = (currentDir, nextDir) => currentDir[nextDir];

const goToHomeDir = function () {

};

const goToParentDir = function () {
  path.pop();
  updateWorkingDirContents();
};

const sameDir = () => undefined;

const cd = function (args) {
  const cdShortcuts = { '.': sameDir, '..': goToParentDir, '': goToHomeDir };

  if (args[0] in cdShortcuts) {
    return cdShortcuts[args[0]]();
  }

  if (!getWorkingDirContents(workingDirContents).includes(args[0])) {
    return 'Error: Directory/file not found';
  }

  path.push(args[0]);
  return;
};

const getWorkingDirContents = () => Object.keys(workingDirContents);

const ls = function (args) {
  if (args.length === 0) {
    return getWorkingDirContents().join(spaces(15));
  }

  return 'Error: Arguments not recognized';
};

const getInstruction = function () {
  return prompt('illu@shell ' + path.at(-1) + ' >').split(' ');
};

const isUndefined = (value) => value === undefined;

const execute = function (command, args) {
  const commandFunctionMap = { 'pwd': pwd, 'echo': echo, 'cd': cd, 'ls': ls, '': '' };
  const commandToExecute = commandFunctionMap[command];

  if (isUndefined(commandToExecute)) {
    return 'Error: Command not recognized';
  }

  if (commandToExecute !== '') {
    return commandToExecute(args);
  }

  return;
};

const illuShell = function () {
  let [command, args, acknowledgement] = ['', '', ''];

  while (command !== 'exit()') {
    [command, ...args] = getInstruction();
    acknowledgement = execute(command, args);

    if (!isUndefined(acknowledgement)) {
      console.log(acknowledgement);
    }
  }

  return;
};

const fileSystem = {
  '~':
  {
    'basics': {
      'assignment1': {
        '01.js': ['const a = 10;', 'const b = 20;', 'console.log(a + b);'],
        '02.js': ['const a = 10;', 'const b = 20;', 'console.log(a - b);']
      },
      'assignment2': {
        '01.js': ['const a =20;', 'const b =30;', 'console.log(a * b);']
      }
    },
    'readMe.txt': ['This is just an sample file system. Here you can add new files and directories.']
  }
};
const path = ['~'];
let workingDirContents = {
  'basics': {
    'assignment1': {
      '01.js': ['const a = 10;', 'const b = 20;', 'console.log(a + b);'],
      '02.js': ['const a = 10;', 'const b = 20;', 'console.log(a - b);']
    },
    'assignment2': {
      '01.js': ['const a =20;', 'const b =30;', 'console.log(a * b);']
    }
  },
  'readMe.txt': ['This is just an sample file system. Here you can add new files and directories.']
};

illuShell();