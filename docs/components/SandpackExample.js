// @flow strict
import {
  SandpackProvider,
  SandpackLayout,
  SandpackPreview,
  SandpackCodeEditor,
  useSandpack,
} from '@codesandbox/sandpack-react';
import React, { type Node } from 'react';
import { Box, Flex } from 'gestalt';
import CopyCodeButton from './buttons/CopyCodeButton.js';
import clipboardCopy from './clipboardCopy.js';
import ShowHideEditorButton from './buttons/ShowHideEditorButton.js';
import OpenInCodeSandboxButton from './buttons/OpenInCodeSandboxButton.js';
import { useLocalFiles } from './contexts/LocalFilesProvider.js';

async function copyCode({ code }: {| code: ?string |}) {
  try {
    await clipboardCopy(code ?? '');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
}

function SandpackContainer({
  name,
  layout,
  previewHeight,
  showEditor,
}: {|
  name: string,
  layout: 'row' | 'column',
  previewHeight?: number,
  showEditor: boolean,
|}) {
  const [editorShown, setEditorShown] = React.useState(showEditor);
  const { sandpack } = useSandpack();

  const defaultHeight = 500;

  return (
    <React.Fragment>
      <Box borderStyle="sm" rounding={2}>
        <SandpackLayout>
          {editorShown && (
            <SandpackCodeEditor
              wrapContent
              style={{
                height: defaultHeight,
                flex: layout === 'column' ? 'none' : null,
                order: layout === 'column' ? 1 : null,
              }}
            />
          )}
          <SandpackPreview
            style={{
              height: previewHeight ?? defaultHeight,
            }}
            showRefreshButton={false}
            showOpenInCodeSandbox={false}
          />
        </SandpackLayout>
      </Box>
      <Box marginTop={2}>
        <Flex justifyContent="end" alignItems="center" gap={2}>
          <OpenInCodeSandboxButton />

          <CopyCodeButton
            onClick={() => {
              const code = sandpack?.files?.['/App.js']?.code;
              copyCode({ code });
            }}
          />

          <ShowHideEditorButton
            expanded={editorShown}
            name={name}
            onClick={() => setEditorShown(!editorShown)}
          />
        </Flex>
      </Box>
    </React.Fragment>
  );
}

export default function SandpackExample({
  code,
  layout = 'row',
  name,
  previewHeight,
  showEditor = true,
}: {|
  code: ?string | (() => Node),
  layout?: 'row' | 'column',
  name: string,
  previewHeight?: number,
  showEditor?: boolean,
|}): Node {
  const { files } = useLocalFiles();

  // Based on
  // https://github.com/codesandbox/sandpack/blob/53811bb4fdfb66ea95b9881ff18c93307f12ce0d/sandpack-react/src/presets/Sandpack.tsx#L67
  return (
    <SandpackProvider
      template="react"
      files={{
        '/styles.css': {
          code: `@import "gestalt/dist/gestalt.css";
          * { margin: 0; padding: 0;}
          body, html, #root { height: 100%; }`,
          hidden: true,
        },
        ...(files
          ? {
              // More info at https://twitter.com/CompuIves/status/1466464916441903116
              // Example: https://codesandbox.io/s/custom-library-in-sandpack-gq12p?file=/src/App.js:407-672
              '/node_modules/gestalt/package.json': {
                code: JSON.stringify({
                  name: 'gestalt',
                  main: './dist/gestalt.js',
                  style: 'dist/gestalt.css',
                }),
                hidden: true,
              },
              '/node_modules/gestalt/dist/gestalt.js': {
                code: files.js,
                hidden: true,
              },
              '/node_modules/gestalt/dist/gestalt.css': {
                code: files.css,
                hidden: true,
              },
            }
          : {}),
        '/App.js': {
          code,
        },
      }}
      theme="dark"
      customSetup={{
        dependencies: {
          ...(files ? { classnames: 'latest' } : { gestalt: 'latest' }),
          react: '18.2.0',
          'react-dom': '18.2.0',
        },
      }}
    >
      <SandpackContainer
        name={name}
        showEditor={showEditor}
        previewHeight={previewHeight}
        layout={layout}
      />
    </SandpackProvider>
  );
}
