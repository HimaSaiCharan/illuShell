const pwd = function (args) {
  if (args.length === 0) {
    return 'User/' + path.join('/');
  }

  return invalidArgMsg;
};

const echo = function (args) {
  return args.join(' ');
};

const goToDir = function (args) {
  return invalidDirMsg;
};

const cd = function (args) {


  return goToDir(args);
};

const spaces = (times) => SPACE.repeat(times);

const currentDirStructure = function () {
  const directoryContents = path;
};

const ls = function (args) {
  if (args.length !== 0) {
    return invalidArgMsg;
  }

  return currentDirStructure();
};


const execute = function (command, args) {
  const commandToExecute = commandFunctionMap[command];

  if (isUndefined(commandToExecute)) {
    return invalidCmdMsg;
  }

  return commandToExecute(args);
};

const getInstruction = function () {
  return prompt(shellPrompt + workingDir.join(' ') + ' >').split(' ');
};

const isUndefined = (value) => value === undefined;

const illuShell = function () {
  while (true) {
    const [command, ...args] = getInstruction();

    if (command === '') {
      continue;
    }

    const acknowledgement = execute(command, args) || '';

    if (acknowledgement === '') {
      continue;
    }

    console.log(acknowledgement);
  }
};

const SPACE = ' ';
const shellPrompt = 'illu@shell ';
const workingDir = ['~'];
const fileSystem = {
  '~':
  {
    'basics': {
      'assignments1': {
        '01.js': ['const a = 10;', 'const b = 20;', 'console.log(a + b)'],
        '02.js': ['const a = 10;', 'const b = 20;', 'console.log(a - b)']
      },
      'assignment2': {
        '01.js': ['const a =20;', 'const b =30', 'console.log(a * b)']
      }
    },
    'readMe.txt': ['This is just an sample file system. Here you can add new files and directories.']
  }
};
const path = ['~'];
const invalidCmdMsg = 'Error: Command not recognized';
const invalidArgMsg = 'Error: Arguments not recognized';
const invalidDirMsg = 'Error: Directory/file not found';
const commandFunctionMap = { 'pwd': pwd, 'echo': echo, 'cd': cd, 'ls': ls };

illuShell();