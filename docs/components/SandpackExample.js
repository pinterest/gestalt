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
  previewHeight,
  showEditor,
}: {|
  name: string,
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
  previewHeight,
  name,
  showEditor = true,
}: {|
  code: ?string | (() => Node),
  previewHeight?: number,
  name: string,
  showEditor?: boolean,
|}): Node {
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
        '/App.js': {
          code,
        },
      }}
      theme="dark"
      customSetup={{
        dependencies: {
          gestalt: 'latest',
          react: '18.2.0',
          'react-dom': '18.2.0',
        },
      }}
    >
      <SandpackContainer name={name} showEditor={showEditor} previewHeight={previewHeight} />
    </SandpackProvider>
  );
}
