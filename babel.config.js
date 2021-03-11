// @flow strict
module.exports = {
  presets: ['@babel/preset-env', '@babel/react', '@babel/flow'],
  plugins: [
    '@babel/proposal-class-properties',
    [
      '@babel/plugin-transform-react-jsx',
      {
        runtime: 'automatic',
        useBuiltIns: true,
      },
    ],
  ],
};
