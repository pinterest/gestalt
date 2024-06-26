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

const dir = (folder) => path.join(__dirname, '..', 'dist', folder);

module.exports = { dir, getFiles };
