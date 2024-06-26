const { dir, getFiles } = require('./getFiles');

// set of snapshot tests for the dist files to make sure file structure is intact
test('All iOS Dist Files Exist', async () => {
  const iOSFiles = await getFiles(dir('ios'));
  expect(iOSFiles).toMatchSnapshot();
});

test('All iOS Swift Files Exist', async () => {
  const iOSFiles = await getFiles(dir('ios-swift'));
  expect(iOSFiles).toMatchSnapshot();
});

test('All Android Dist Files Exist', async () => {
  const androidFiles = await getFiles(dir('android'));
  expect(androidFiles).toMatchSnapshot();
});

test('All Web CSS Files Exist', async () => {
  const cssFiles = await getFiles(dir('css'));
  expect(cssFiles).toMatchSnapshot();
});

test('All Web JS Files Exist', async () => {
  const jsFiles = await getFiles(dir('js'));
  expect(jsFiles).toMatchSnapshot();
});
