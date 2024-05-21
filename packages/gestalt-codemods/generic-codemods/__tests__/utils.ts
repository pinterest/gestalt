/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import fs from 'fs';
import path from 'path';
import { applyTransform } from 'jscodeshift/src/testUtils';

export function buildInputPath({ test }: { test: string }): string {
  const dirName = __dirname;
  const fixtureDir = path.join(dirName, '..', `__testfixtures__`);
  return path.join(fixtureDir, `${test}.input.tsx`);
}

export function buildManualAttentionErrorMessage({
  test,
  lines,
}: {
  test: string;
  lines: Array<number>;
}): string {
  return `This file requires manual attention. Follow the PR's instructions in the following code locations
${lines.map((line) => `Location: ${buildInputPath({ test })} @line: ${line}`).join('\n')}`;
}

export default function buildCustomApplyTransform({
  transformName,
  moduleOptions,
  test,
}: {
  transformName: string;
  moduleOptions: {
    quote: 'single';
    component: string;
    subcomponent?: string;
    prop?: string;
    nextProp?: string;
    value?: string | number | boolean;
    nextValue?: string | number | boolean;
  };
  test: string;
}): () => void {
  function customApplyTransform() {
    const dirName = __dirname;
    const fixtureDir = path.join(dirName, '..', '__testfixtures__');
    const inputPath = path.join(fixtureDir, `${test}.input.tsx`);
    const source = fs.readFileSync(inputPath, 'utf8');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const module = require(path.join(dirName, '..', transformName));

    applyTransform(
      module,
      moduleOptions,
      {
        path: inputPath,
        source,
      },
      { parser: 'tsx' },
    );
  }
  return customApplyTransform;
}
