const path = require('path');
const shell = require('shelljs');
const papa = require('papaparse');

/*
  Calculate raw and percentage number of gestalt components vs native components
  Usage: `node ./scripts/stats/index.js ~/code/repo1/ ~/code/repo2/`
*/
const directories = process.argv.slice(2);
const { stdout: transformOutput, stderr: transformError } = shell.exec(
  `jscodeshift --transform ${path.join(
    __dirname,
    'transform.js',
  )} --parser flow --dry ${directories.join(' ')} | grep "^/"`,
  {
    silent: true,
  },
);
if (transformError) {
  throw transformError;
}
const headers = ['path', 'componentName', 'isTest', 'inGestalt'].join(';');

const { data } = papa.parse(`${headers}\n${transformOutput}`, {
  dynamicTyping: true,
  header: true,
});
const withoutTests = data.filter((file) => !file.isTest);

const inGestalt = withoutTests.filter((file) => !!file.inGestalt);
const nativeDom = withoutTests.filter((file) => !file.inGestalt);

const inGestaltCount = inGestalt.length;
const nativeDomCount = nativeDom.length;
const totalCount = inGestalt.length + nativeDom.length;

// eslint-disable-next-line no-console
console.log(`
Raw numbers: ${inGestaltCount} gestalt components vs ${nativeDomCount} native components
Percentage: ${((inGestaltCount / totalCount) * 100).toFixed(2)}%
`);
