const { exec } = require('child_process');

const startDebug = () => {
  const ls = exec('ssh -A -N -L 9229:localhost:9229 devapp', (error, stdout, stderr) => {
    if (error) {
      console.log(error.stack);
      console.log(`Error code: ${error.code}`);
      console.log(`Signal received: ${error.signal}`);
    }
    console.log(stdout);
    console.error(stderr);
  });

  ls.on('exit', (code) => {
    console.log(`Debugger exited with error code ${code}`);
  });
};
module.exports = startDebug;
