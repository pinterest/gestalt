// @flow strict

/*::
type WebpackConfig = {| watchOptions: {| poll: number | false |}  ,resolve: {fallback: { fs: false, path: false }}, |};
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
        /* Explicitly tell webpack to ignore resolving "fs" for the client bundle
        To get the markdown files from disk, we use the fs module. Since we're allowed to use it in the getStaticProps method of next js, we should be okay to resolve it
        However, webpack also tries to add it to the client and causes an error. This line should prevent that.
        */
        fallback: { fs: false, path: false },
      },
      ...config,
      watchOptions: {
        ...config.watchOptions,
        poll: dev ? 500 : false,
      },
    }),
};
