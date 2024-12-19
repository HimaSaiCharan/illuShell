const shellPrompt = 'illu@shell ';
const workingPath = ['~'];
const path = ['this', 'that'];
const invalidCmdMsg = 'Error: Command not recognized';
const invalidArgMsg = 'Error: Arguments not recognized';
const file1 = ['This is a file in which there will be ,any things'];
const directory1 = ['file1', 'file2'];
const directory2 = ['file3', 'file4', 'file5'];
const directory3 = ['file6'];

const pwd = function (args) {
  if (args.length === 0) {
    return 'User/' + path.join('/');
  }

  return invalidArgMsg;
};

const echo = function (args) {
  return args.join(' ');
};

const goToBackDir = function () {
  if (path.length > 0) {
    path.pop();
  }

  if (path.length < 1) {
    workingPath[0] = '~';
    return;
  }

  workingPath[0] = path.at(-1);
};

const nothing = function () {
  return;
};

const goToDir = function (args) {

};

const cd = function (args) {
  switch (args.join('')) {
    case '': return nothing();
    case '.': return nothing();
    case '..': return goToBackDir();
  }

  return goToBackDir(args);
};

const commandFunctions = [pwd, echo, cd];

const execute = function (command, args) {
  const commandFunction = commandFunctions.find(function (list) {
    return command === list.name;
  });

  if (isUndefined(commandFunction)) {
    return invalidCmdMsg;
  }

  return commandFunction(args);
};

const getInstruction = function () {
  return prompt(shellPrompt + workingPath.join(' ') + ' >').split(' ');
};

const isUndefined = function (value) {
  return value === undefined;
};

const illuShell = function () {
  while (true) {
    const [command, ...args] = getInstruction();

    if (command === '') {
      continue;
    }

    const acknowledgement = execute(command, args);

    if (isUndefined(acknowledgement)) {
      continue;
    }

    console.log(acknowledgement);
  }
};

illuShell();