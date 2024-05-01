// @noflow
const prettier = require('prettier');
const { transform } = require('sucrase');

/**
 * This Webpack loader is used to clean up the docs code examples for display in the Sandpack code editor. It removes Flow types and eslint disable comments.
 */
// $FlowFixMe[missing-this-annot]
module.exports = function exampleCleanupLoader(tsSource /*: string */) {
  const callback = this.async();
  this.cacheable();

  // return detype.transform(tsSource, this.resourcePath).then((jsSource) => {
  const jsSource = transform(tsSource, {
    transforms: ['typescript', 'jsx'],
    jsxRuntime: 'preserve',
  }).code;

  // Remove suppression comments
  const removed = jsSource
    .replace(/\/\/\s*@ts-expect-error.*\n/gm, '') // Remove @ts-expect-error comments
    .replace(/\{\/\*\s+@ts-expect-error.*\*\/\}\n/gm, '') // Remove @ts-expect-error comments
    // Remove eslint disable comments
    .replace(/\/\/\s*eslint-disable-line.*\n/gm, '')
    .replace(/\/\/\s*eslint-disable-next-line.*\n/gm, '');

  // $FlowFixMe[prop-missing]
  prettier.resolveConfig(process.cwd()).then((prettierOptions) => {
    // Pretty things up
    const formatted = prettier
      // $FlowFixMe[prop-missing]
      .format(removed, {
        ...prettierOptions,
        parser: 'babel',
      })
      // Remove the empty import statement if only types were imported from react
      .replace(`import {} from 'react';\n`, '');

    const json = JSON.stringify(formatted)
      // https://stackoverflow.com/a/9168133/5253702
      .replace(/\u2028/g, '\\u2028')
      .replace(/\u2029/g, '\\u2029');
    callback(null, `export default ${json};`);
  });
  // });
};
