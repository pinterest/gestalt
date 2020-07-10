// @flow strict
import * as React from 'react';
import fs from 'fs';
import path from 'path';
import Markdown from '../components/Markdown.js';

export async function getStaticProps() {
  const dir = process.cwd();
  const root = path.join(dir, '..');
  return {
    props: {
      readme: fs.readFileSync(path.join(root, 'README.md'), 'utf8'),
    },
  };
}

export default ({ readme }) => <Markdown text={readme} />;
