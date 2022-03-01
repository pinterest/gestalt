// @flow strict
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import { applyTransform } from 'jscodeshift/dist/testUtils.js';
import fs from 'fs';
import path from 'path';

export default function buildCustomApplyTransform({
  transformName,
  moduleOptions,
  test,
}: {
  transformName: string,
  moduleOptions: {
    quote: 'single',
    component: string,
    subcomponent: string,
    prop?: string,
    value?: string | number | boolean,
  },
  test: string,
}): () => void {
  function customApplyTransform() {
    const dirName = __dirname;
    const fixtureDir = path.join(dirName, '..', '__testfixtures__');
    const inputPath = path.join(fixtureDir, `${test}.input.js`);
    const source = fs.readFileSync(inputPath, 'utf8');
    // $FlowFixMe[unsupported-syntax]
    const module = require(path.join(dirName, '..', transformName));

    applyTransform(
      module,
      moduleOptions,
      {
        path: inputPath,
        source,
      },
      {},
    );
  }
  return customApplyTransform;
}
