// @flow strict

const tranformPlugin /*: string */ =
  process.env.NODE_ENV === 'development'
    ? '@babel/plugin-transform-react-jsx-self'
    : '@babel/plugin-transform-react-jsx';
const modules /*: string | boolean */ = process.env.NODE_ENV === 'production' ? false : 'auto';

module.exports = {
  presets: [['@babel/preset-env', { modules }], '@babel/react', '@babel/flow'],
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
