module.exports = {
  presets: [
    ['@babel/preset-env', { modules: process.env.NODE_ENV === 'production' ? false : 'auto' }],
    ['@babel/react', { 'runtime': 'automatic' }],
    '@babel/preset-typescript',
  ],
  plugins: [
    process.env.EXPERIMENTAL_BUILD === 'true'
      ? [
          // needs to run first before other Babel plugins as the compiler requires the input source information for sound analysis
          'babel-plugin-react-compiler',
          {
            runtimeModule: 'react-compiler-runtime',
          },
        ]
      : {},
    '@babel/proposal-class-properties',
    [
      process.env.NODE_ENV === 'development'
        ? '@babel/plugin-transform-react-jsx-self'
        : '@babel/plugin-transform-react-jsx',
      {
        runtime: 'automatic',
        useBuiltIns: true,
      },
    ],
  ],
};
