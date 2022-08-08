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

const MIN_HEIGHT = 350;
const MAX_WIDTH = 390;

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
  previewHeight = 'md',
  showEditor,
  hideControls,
  mobileView,
}: {|
  name: string,
  layout: 'row' | 'column',
  previewHeight?: 'sm' | 'md' | number,
  showEditor: boolean,
  hideControls?: boolean,
  mobileView?: boolean,
|}) {
  const [editorShown, setEditorShown] = React.useState(showEditor);
  const { sandpack } = useSandpack();

  const CARD_SIZE_NAME_TO_PIXEL = {
    sm: 236,
    md: MIN_HEIGHT,
  };

  const height =
    previewHeight !== 'sm' && previewHeight !== 'md'
      ? previewHeight
      : CARD_SIZE_NAME_TO_PIXEL[previewHeight];

  const maxWidth = mobileView ? MAX_WIDTH : undefined;

  return (
    <React.Fragment>
      <Box borderStyle="sm" rounding={2}>
        <SandpackLayout>
          <SandpackPreview
            style={{
              maxWidth,
              height,
            }}
            showRefreshButton={false}
            showOpenInCodeSandbox={false}
          />
          {editorShown && (
            <SandpackCodeEditor
              wrapContent
              style={{
                height: height > MIN_HEIGHT ? height : MIN_HEIGHT,
                flex: layout === 'column' ? 'none' : null,
                order: 1,
              }}
            />
          )}
        </SandpackLayout>
      </Box>
      <Box
        marginTop={2}
        display={hideControls ? undefined : 'none'}
        height={hideControls ? 24 : undefined}
      />
      <Box marginTop={2} display={hideControls ? 'none' : undefined}>
        <Flex
          justifyContent="end"
          alignItems="center"
          gap={{
            row: 2,
            column: 0,
          }}
        >
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
  hideControls = false,
  mobileView = false,
}: {|
  code: ?string | (() => Node),
  layout?: 'row' | 'column',
  name: string,
  previewHeight?: 'sm' | 'md' | number,
  showEditor?: boolean,
  hideControls?: boolean,
  mobileView?: boolean,
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
        hideControls={hideControls}
        mobileView={mobileView}
      />
    </SandpackProvider>
  );
}
