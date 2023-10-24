// @flow strict
import { type Node } from 'react';
import { useSandpack } from '@codesandbox/sandpack-react';
import LZString from 'lz-string';
import OpenSandboxButton from './OpenSandboxButton.js';

const getParameters = (parameters: { files: { ... }, template?: string }): string =>
  LZString.compressToBase64(JSON.stringify(parameters))
    .replace(/\+/g, '-') // Convert '+' to '-'
    .replace(/\//g, '_') // Convert '/' to '_'
    .replace(/=+$/, ''); /* Remove ending '=' */

const getFileParameters = (
  files: { [string]: { code: string, hidden: boolean } },
  environment?: string,
): string => {
  const normalizedFiles = Object.keys(files).reduce((prev, next) => {
    const fileName = next.replace('/', '');
    const value = {
      content: files[next].code,
      isBinary: false,
    };

    return { ...prev, [fileName]: value };
  }, {});

  return getParameters({
    files: normalizedFiles,
    ...(environment ? { template: environment } : null),
  });
};

async function handleCodeSandbox(parameters: string) {
  const formData = new FormData();
  formData.append('parameters', parameters);

  const url = await fetch('https://codesandbox.io/api/v1/sandboxes/define?json=1', {
    method: 'post',
    body: formData,
    mode: 'cors',
  })
    .then((response) => response.json())
    .then(({ errors, sandbox_id: id }) => {
      if (errors) throw errors;
      return `https://codesandbox.io/s/${id}?module=/App.js`;
    });
  window.open(url);
}

export default function OpenInCodeSandboxButton(): Node {
  // Based on
  // https://github.com/codesandbox/sandpack/blob/53811bb4fdfb66ea95b9881ff18c93307f12ce0d/sandpack-react/src/common/OpenInCodeSandboxButton/UnstyledOpenInCodeSandboxButton.tsx#L84

  const { sandpack } = useSandpack();
  const parameters = getFileParameters(sandpack.files, sandpack.environment);

  return (
    <OpenSandboxButton
      onClick={() => {
        handleCodeSandbox(parameters);
      }}
    />
  );
}
