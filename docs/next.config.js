// @flow strict

/*::
type WebpackConfig = {|
  watchOptions: {| poll: number | false |},
  module: {|
    rules: $ReadOnlyArray<{test: RegExp, use: string}>
  |},
  resolve: {fallback: { fs: false, path: false }}
|};

type RedirectsReturn = Promise<
  $ReadOnlyArray<{|
    source: string,
    destination: string,
    permanent: boolean,
  |}>,
>
*/

const path = require('path');
const redirects = require('./redirects.js');

const root /*: string */ = path.join(__dirname, '../');

module.exports = {
  images: {
    domains: [
      'paper-attachments.dropbox.com',
      'ibb.co',
      'codahosted.io',
      'i.pinimg.com',
      'github.com',
    ],
  },
  reactStrictMode: true,
  redirects: async () /*: RedirectsReturn */ => redirects,
  serverRuntimeConfig: {
    DOCS_ROOT: __dirname,
    GESTALT_ROOT: root,
  },
  webpack: (
    config /*: WebpackConfig */,
    { dev } /*: {| dev: boolean |} */,
  ) /*: WebpackConfig */ => ({
    ...config,
    resolve: {
      ...config.resolve,
      /**
       * Explicitly tell webpack to ignore resolving "fs" for the client bundle
       * To get the markdown files from disk, we use the fs module. Since we're allowed to use it in the getStaticProps method of next js, we should be okay to resolve it
       * However, webpack also tries to add it to the client and causes an error. This line should prevent that.
       */
      fallback: { fs: false, path: false },
    },
    module: {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /examples\/.*\.js/,
          use: path.resolve('./removeFlowTypesLoader.js'),
        },
      ],
    },
    watchOptions: {
      ...config.watchOptions,
      poll: dev ? 500 : false,
    },
  }),
};
