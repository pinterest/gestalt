// @flow strict

/*::
type WebpackConfig = {|
  watchOptions: {| poll: number | false |},
  module: {|
    rules: Array<{test: RegExp, use: string}>
  |},
  resolve: {fallback: { fs: false, path: false }, alias: { react: string}},
  externals: $ReadOnlyArray<mixed>
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
  experimental: {
    appDir: true,
  },
  webpack: (
    config /*: WebpackConfig */,
    options /*: {| dev: boolean, isServer: boolean |} */,
  ) /*: WebpackConfig */ => {
    // Needed to solve module duplication issues in Next.Js after upgrading to Next.js 13.0.0 by using a React submodule Solution from: https://jlte.ch/blogs/solving-module-duplication-issues-nextjs-react-submodule/
    if (options.isServer) {
      // eslint-disable-next-line no-param-reassign
      config.externals = ['react', ...config.externals];
    }

    // eslint-disable-next-line no-param-reassign
    config.resolve.alias.react = path.resolve(__dirname, '.', 'node_modules', 'react');

    return {
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
        poll: options.dev ? 500 : false,
      },
    };
  },
};
