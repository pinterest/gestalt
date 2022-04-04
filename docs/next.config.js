// @flow strict

/*::
type WebpackConfig = {| watchOptions: {| poll: number | false |} |};
*/

const path = require('path');

const root /*: string */ = path.join(__dirname, '../');

module.exports = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    DOCS_ROOT: __dirname,
    GESTALT_ROOT: root,
  },
  webpack: (config /*: WebpackConfig */, { dev } /*: {| dev: boolean |} */) /*: WebpackConfig */ =>
    // These modules resolve by default in the server-side functions.
    ({
      resolve: {
        // Explicitly tell webpack to ignore resolving "fs" for the client bundle
        fallback: { fs: false, path: false },
      },
      ...config,
      watchOptions: {
        ...config.watchOptions,
        poll: dev ? 500 : false,
      },
    }),
};
