// @flow strict
const path = require('node:path');
const { run: jscodeshift } = require('jscodeshift/src/Runner');

const exampleFileNames = JSON.stringify([]);
const exampleNames = JSON.stringify([]);

const component = (process.env.COMP = 'image');

process.env.FILENAMES = exampleFileNames;
process.env.EXAMPLENAMES = exampleNames;

const transformPath = path.resolve('transform.ts');
const paths = [`docs/pages/web/${component}.js`];
const options = {
  dry: exampleNames.length < 5,
  // print: true,
  verbose: 2,
  parser: 'flow',
};

const res = jscodeshift(transformPath, paths, options);
// res.then(console.log);
