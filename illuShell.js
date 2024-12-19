const shellPrompt = 'illu@shell ';
const workingPath = ['~'];
const path = ['user', 'illu'];
const invalidCmdMsg = 'Error: Command not recognized';
const invalidArgMsg = 'Error: Arguments not recognized';

const pwd = function (args) {
  if (args.length === 0) {
    return path.join('/');
  }

  return invalidArgMsg;
};

const echo = function (args) {
  return args.join(' ');
};

const changeDir = function () {
  //code has to be written
};

const respectiveCommandFunction = [['pwd', pwd], ['echo', echo]];

const execute = function (command, args) {
  const commandFunction = respectiveCommandFunction.find(function (list) {
    return command === list[0];
  });

  if (isUndefined(commandFunction)) {
    return invalidCmdMsg;
  }

  return commandFunction[1](args);
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