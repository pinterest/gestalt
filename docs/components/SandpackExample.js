// @flow strict
import {
  SandpackProvider,
  SandpackLayout,
  SandpackPreview,
  SandpackCodeEditor,
  useSandpack,
} from '@codesandbox/sandpack-react';
import React, { useEffect, type Node } from 'react';
import { Box, Flex } from 'gestalt';
import CopyCodeButton from './buttons/CopyCodeButton.js';
import clipboardCopy from './clipboardCopy.js';
import ShowHideEditorButton from './buttons/ShowHideEditorButton.js';
import OpenInCodeSandboxButton from './buttons/OpenInCodeSandboxButton.js';

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
  const [localFiles, setLocalFiles] = React.useState(false);
  const [localCSS, setLocalCSS] = React.useState(null);
  const [localJS, setLocalJS] = React.useState(null);

  useEffect(() => {
    if (typeof document === 'undefined' || !document.location) {
      return;
    }
    // Use local gestalt JS and CSS when `?localFiles=true` is in the URL
    const params = new URL(document.location.toString()).searchParams;
    setLocalFiles(params.get('localFiles') === 'true');
  }, []);

  useEffect(() => {
    if (localFiles === false) {
      return;
    }
    fetch('/api/localFiles')
      .then((res) => res.json())
      .then((data) => {
        setLocalCSS(data.css);
        setLocalJS(data.js);
      });
  }, [localFiles]);

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
        ...(localFiles
          ? {
              // More info at https://twitter.com/CompuIves/status/1466464916441903116
              // Example: https://codesandbox.io/s/custom-library-in-sandpack-gq12p?file=/src/App.js:407-672
              '/node_modules/gestalt/package.json': {
                code: JSON.stringify({
                  name: 'gestalt',
                  main: './dist/gestalt.js',
                  style: 'dist/gestalt.css',
                }),
              },
              '/node_modules/gestalt/dist/gestalt.js': {
                code: localJS,
              },
              '/node_modules/gestalt/dist/gestalt.css': {
                code: localCSS,
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
          ...(localFiles ? { classnames: 'latest' } : { gestalt: 'latest' }),
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
