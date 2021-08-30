// @flow strict

/*::
type WebpackConfig = {| watchOptions: {| poll: number | false |} |};
*/

module.exports = {
  reactStrictMode: true,
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
