// @flow strict

/*::
type WebpackConfig = {| watchOptions: {| poll: number | false |} |};
*/

const path = require('path');

const root /*: string */ = path.join(__dirname, '../');

const requireGFM = require('remark-gfm');

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [requireGFM],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    providerImportSource: '@mdx-js/react',
  },
});

module.exports = withMDX({
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],

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
});
