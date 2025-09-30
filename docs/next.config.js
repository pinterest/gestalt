const path = require('path');
const redirects = require('./redirects');

const root = path.join(__dirname, '../');

// Set basePath from environment variable (e.g., BASE_PATH="/v1")
const basePath = process.env.BASE_PATH;

module.exports = {

  // Only set basePath if the env var is defined
  ...(basePath ? { basePath } : {}),
  // Only set trailingSlash if basePath is defined
  ...(basePath ? { trailingSlash: false } : {}),


  images: {
    domains: [
      'paper-attachments.dropbox.com',
      'ibb.co',
      'codahosted.io',
      'i.pinimg.com',
      'github.com',
      'pinterest-assets.com',
      'www.pinterest-assets.com',
    ],
  },
  reactStrictMode: true,
  redirects: async () => redirects,
  serverRuntimeConfig: {
    DOCS_ROOT: __dirname,
    GESTALT_ROOT: root,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  webpack: (config, { dev }) => ({
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
          test: /examples\/.*\.tsx$/,
          use: path.resolve('./exampleCleanupLoader.js'),
        },
      ],
    },
    watchOptions: {
      ...config.watchOptions,
      poll: dev ? 500 : false,
    },
  }),
};
