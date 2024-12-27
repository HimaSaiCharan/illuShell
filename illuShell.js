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
const currentPath = ['~'];
let workingDirTree = fileSystem['~'];

const spaces = (times) => ' '.repeat(times);

const pwd = function (args) {
  if (args.length === 0) {
    return 'User/' + currentPath.slice(1).join('/');
  }

  return 'Error: Arguments not recognized';
};

const echo = (args) => args.join(' ');

const goToParentDir = function () {
  if (currentPath.length === 1) { return; }

  currentPath.pop();
  workingDirTree = currentPath.reduce((currentDir, nextDir) => currentDir[nextDir], fileSystem);
  return;
};

const goToHomeDir = function () {

};

const stayInSameDirectory = () => undefined;

const updateWorkingDirContents = function (currentDir) {
  const newDir = workingDirTree[currentDir];
  workingDirTree = newDir;
  return;
};

const isDirNameValid = function (dirName) {
  return dirName.length > 0 && dirName[0].length > 0 && !dirName[0].includes('.');
};

const isItemPresent = (itemName) => itemName[0] in workingDirTree;

const cd = function (args) {
  const cdShortcuts = { '.': stayInSameDirectory, '..': goToParentDir, '~': goToHomeDir };

  if (args[0] in cdShortcuts) {
    return cdShortcuts[args[0]]();
  }

  if (isDirNameValid(args) && isItemPresent(args)) {
    currentPath.push(args[0]);
    return updateWorkingDirContents(args[0]);
  }

  return 'Error: Directory not found';
};

const ls = function (args) {
  if (args.length === 0) {
    return Object.keys(workingDirTree).join(spaces(15));
  }

  return 'Error: Arguments not recognized';
};

const isFileNameValid = function (fileName) {
  return fileName.length > 0 && fileName[0].length > 0 && fileName[0].includes('.');
};

const cat = function (args) {
  if (isFileNameValid(args) && isItemPresent(args)) {
    return workingDirTree[args[0]].join('\n');
  }

  return 'Error: File not found';
};

const addItemToFileSystem = function (itemName, item) {
  workingDirTree[itemName] = item;
  return;
};

const mkdir = function (args) {
  if (!isDirNameValid(args)) {
    return 'Error: Invalid directory name';
  }

  if (isItemPresent(args)) {
    return 'Error: Directory already exists';
  }

  return addItemToFileSystem(args[0], {});
};

const touch = function (args) {
  if (!isFileNameValid(args)) {
    return 'Error: Invalid file name';
  }

  if (isItemPresent(args)) {
    return 'Error: File already exists';
  }

  return addItemToFileSystem(args[0], []);
};

const getInstruction = function () {
  return prompt('illu@shell ' + currentPath.at(-1) + ' >').split(' ');
};

const isUndefined = (value) => value === undefined;

const execute = function (command, args) {
  const commandFunctionMap = { 'pwd': pwd, 'echo': echo, 'cd': cd, 'ls': ls, 'cat': cat, 'mkdir': mkdir, 'touch': touch, '': '' };
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

illuShell();