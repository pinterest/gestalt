const decomment = require('decomment');
const { dir, getFiles } = require('./getFiles');
const { readFile } = require('fs').promises;

test('All CSS Tokens Exist', async () => {
  const webTokens = await getFiles(dir('css'));
  const tokenFiles = {};

  await Promise.all(
    webTokens.map(async (file) => {
      const contents = await readFile(file, 'utf8');
      tokenFiles[file] = decomment(contents, { tolerant: true });
      return contents;
    }),
  );

  expect(tokenFiles).toMatchSnapshot();
});

test('All JS Tokens Exist', async () => {
  const webTokens = await getFiles(dir('js'));
  const tokenFiles = {};

  await Promise.all(
    webTokens.map(async (file) => {
      const contents = await readFile(file, 'utf8');
      tokenFiles[file] = decomment(contents, { tolerant: true });
      return contents;
    }),
  );

  expect(tokenFiles).toMatchSnapshot();
});
