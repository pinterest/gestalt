module.exports = {
  presets: [
    ['@babel/preset-env', { modules: process.env.NODE_ENV === 'production' ? false : 'auto' }],
    ['@babel/preset-react', { 'runtime': 'automatic' }],
    '@babel/preset-typescript',
  ],
  plugins: [
    '@babel/proposal-class-properties',
    // '@babel/transform-typescript',
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
