// @flow strict
const flowRemoveTypes = require('flow-remove-types');
const prettier = require('prettier');

/**
 * This Webpack loader is used to clean up the docs code examples for display in the Sandpack code editor. It removes Flow types and eslint disable comments.
 */
module.exports = function removeFlowTypesLoader(source /*: string */) {
  const callback = this.async();
  this.cacheable();

  const options = {};
  // Remove Flow declarations/types
  const removed = flowRemoveTypes(source)
    .toString()
    // Also remove what's left of the initial declaration comment
    .replace('//       strict', '')
    // Remove FlowFixMe comments
    .replace(/\/\/\s*\$FlowFixMe.*\n/gm, '')
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
    const esModule = typeof options.esModule !== 'undefined' ? options.esModule : true;
    callback(null, `${esModule ? 'export default' : 'module.exports ='} ${json};`);
  });
};
