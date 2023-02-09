module.exports = {
  automock: false,
  transform: {'\\.ts$': ['ts-jest']},
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  // https://github.com/adaltas/node-csv/issues/309
  moduleNameMapper: {
    '^csv-stringify/sync':
      '<rootDir>/node_modules/csv-stringify/dist/cjs/sync.cjs',
  },
};
