// @flow strict

const tranformPlugin /*: string */ =
  process.env.NODE_ENV === 'development'
    ? '@babel/plugin-transform-react-jsx-self'
    : '@babel/plugin-transform-react-jsx';
module.exports = {
  presets: ['@babel/preset-env', '@babel/react', '@babel/flow'],
  plugins: [
    '@babel/proposal-class-properties',
    [
      tranformPlugin,
      {
        runtime: 'automatic',
        useBuiltIns: true,
      },
    ],
  ],
};
