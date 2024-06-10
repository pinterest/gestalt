const { resolve } = require('path');
const path = require('path');
const { readdir } = require('fs').promises;

// from https://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search
async function getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
    }),
  );
  return Array.prototype.concat(...files).map((file) => path.relative(process.cwd(), file));
}

// set of snapshot tests for the dist files to make sure file structure is intact
test('All iOS Dist Files Exist', async () => {
  const iOSFiles = await getFiles('./dist/ios');
  expect(iOSFiles).toMatchSnapshot();
});

test('All Android Dist Files Exist', async () => {
  const androidFiles = await getFiles('./dist/android');
  expect(androidFiles).toMatchSnapshot();
});

test('All Web CSS Files Exist', async () => {
  const cssFiles = await getFiles('./dist/css');
  expect(cssFiles).toMatchSnapshot();
});

test('All Web JS Files Exist', async () => {
  const jsFiles = await getFiles('./dist/js');
  expect(jsFiles).toMatchSnapshot();
});
