const decomment = require('decomment');
const { dir, getFiles } = require('./getFiles');
const { readFile } = require('fs').promises;

test('All Android Tokens Exist', async () => {
  const androidTokens = await getFiles(dir('android'));

  const tokenFiles = {};
  await Promise.all(
    androidTokens.map(async (file) => {
      const contents = await readFile(file, 'utf8');
      tokenFiles[file] = decomment(contents);
      return contents;
    }),
  );

  expect(tokenFiles).toMatchSnapshot();
});
