// @flow strict

/*::
type WebpackConfig = {| watchOptions: {| poll: number | false |} |};
*/

const path = require('path');

const root /*: string */ = path.join(__dirname, '../');

module.exports = {
  reactStrictMode: true,
  experimental: {
    concurrentFeatures: true,
    reactStrictMode: true,
  },
  serverRuntimeConfig: {
    DOCS_ROOT: __dirname,
    GESTALT_ROOT: root,
  },
  webpack: (
    config /*: WebpackConfig */,
    { dev } /*: {| dev: boolean |} */,
  ) /*: WebpackConfig */ => ({
    ...config,
    watchOptions: {
      ...config.watchOptions,
      poll: dev ? 500 : false,
    },
  }),
};
