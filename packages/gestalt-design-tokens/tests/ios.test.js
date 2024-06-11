const decomment = require('decomment');
const { dir, getFiles } = require('./getFiles');
const { readFile } = require('fs').promises;

test('All iOS Tokens Exist', async () => {
  const iosTokens = await getFiles(dir('ios-swift'));
  const tokenFiles = {};

  await Promise.all(
    iosTokens.map(async (file) => {
      try {
        const contents = await readFile(file, 'utf8');
        tokenFiles[file] = decomment(contents, { tolerant: true });
        return contents;
      } catch (ex) {
        // eslint-disable-next-line no-console
        console.log(`Unable to strip comments for ${file}`);
      }
      return undefined;
    }),
  );

  expect(tokenFiles).toMatchSnapshot();
});
