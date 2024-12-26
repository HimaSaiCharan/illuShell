const spaces = (times) => SPACE.repeat(times);

const pwd = function (args) {
  if (args.length === 0) {
    return 'User/' + path.slice(1).join('/');
  }

  return invalidArgMsg;
};

const echo = (args) => args.join(' ');

const updateWorkingDirContents = function () {
  const workingDirTree = path.reduce(getDirContents, fileSystem);
  const workingDirlocalEntries = Object.keys(workingDirTree);
  Object.assign(workingDirContents, workingDirlocalEntries);
};

const goToHomeDir = function () {

};

const goToParentDir = function () {
  path.pop();
  updateWorkingDirContents();
};

const doNothing = () => undefined;

const cd = function (args) {
  console.log(args);
  if (args[0] in cdShortcuts) {
    return args[0]();
  }

  if (!workingDirContents.includes(args[0])) {
    return invalidDirMsg;
  }

  path.push(args[0]);
  updateWorkingDirContents();
};

const getDirContents = (currentDir, subDir) => currentDir[subDir];

const getWorkingDirContents = () => workingDirContents.join(spaces(15));

const ls = function (args) {
  if (args.length === 0) {
    return getWorkingDirContents();
  }

  return invalidArgMsg;
};


const execute = function (command, args) {
  const commandToExecute = commandFunctionMap[command];

  if (isUndefined(commandToExecute)) {
    return invalidCmdMsg;
  }

  return commandToExecute(args);
};

const getInstruction = function () {
  return prompt(shellPrompt + path.at(-1) + ' >').split(' ');
};

const isUndefined = (value) => value === undefined;

const illuShell = function () {
  while (true) {
    const [command, ...args] = getInstruction();

    if (command === '') { continue; }
    if (command === 'exit()') { return; }

    const acknowledgement = execute(command, args);

    if (isUndefined(acknowledgement)) { continue; }

    console.log(acknowledgement);
  }
};

const SPACE = ' ';
const shellPrompt = 'illu@shell ';
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
const workingDirContents = ['basics', 'readMe.txt'];
const invalidCmdMsg = 'Error: Command not recognized';
const invalidArgMsg = 'Error: Arguments not recognized';
const invalidDirMsg = 'Error: Directory/file not found';
const commandFunctionMap = { 'pwd': pwd, 'echo': echo, 'cd': cd, 'ls': ls };
const cdShortcuts = { '.': doNothing, '..': goToParentDir, '': goToHomeDir };

illuShell();