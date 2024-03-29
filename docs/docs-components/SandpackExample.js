// @flow strict
import { Fragment, type Node as ReactNode, useEffect, useState } from 'react';
import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
  useSandpack,
} from '@codesandbox/sandpack-react';
import { Box, Flex } from 'gestalt';
import { useAppContext } from './appContext';
import CodeExampleDarkModeButton from './buttons/CodeExampleDarkModeButton';
import CodeExampleTextDirectionButton from './buttons/CodeExampleTextDirectionButton';
import CopyCodeButton from './buttons/CopyCodeButton';
import OpenInCodeSandboxButton from './buttons/OpenInCodeSandboxButton';
import ShowHideEditorButton from './buttons/ShowHideEditorButton';
import clipboardCopy from './clipboardCopy';
import { useDocsExperiments } from './contexts/DocsExperimentProvider';
import { useLocalFiles } from './contexts/LocalFilesProvider';
import DevelopmentEditor from './DevelopmentEditor';

const MIN_EDITOR_HEIGHT = 350;
const MAX_EDITOR_IPHONE_SE_MOBILE_WIDTH = 375;
const MAX_EDITOR_IPHONE_SE_MOBILE_HEIGHT = 667;

async function copyCode({ code }: { code: ?string }) {
  try {
    await clipboardCopy(code ?? '');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
}

function SandpackContainer({
  exampleColorScheme,
  exampleTextDirection,
  hideControls = false,
  hideEditor = false,
  layout,
  name,
  previewHeight,
  toggleExampleColorScheme,
  toggleExampleTextDirection,
}: {
  exampleColorScheme: 'light' | 'dark',
  exampleTextDirection: 'ltr' | 'rtl',
  hideControls?: boolean,
  hideEditor?: boolean,
  layout: 'row' | 'column' | 'mobileRow' | 'mobileColumn',
  name: string,
  previewHeight?: number,
  toggleExampleColorScheme: () => void,
  toggleExampleTextDirection: () => void,
}) {
  const [editorShown, setEditorShown] = useState(!hideEditor);
  const { sandpack } = useSandpack();

  const isMobileRowLayout = layout === 'mobileRow';
  const isMobileColumnLayout = layout === 'mobileColumn';
  let codeEditorHeight = MIN_EDITOR_HEIGHT;

  if (!!previewHeight && previewHeight > MIN_EDITOR_HEIGHT) {
    codeEditorHeight = previewHeight;
  }

  if (isMobileRowLayout) {
    codeEditorHeight = MAX_EDITOR_IPHONE_SE_MOBILE_HEIGHT;
  }

  return (
    <Fragment>
      <Box
        borderStyle="sm"
        color="darkWash"
        display={isMobileRowLayout ? 'flex' : undefined}
        justifyContent="center"
        rounding={2}
      >
        <SandpackLayout>
          <SandpackPreview
            showOpenInCodeSandbox={false}
            showRefreshButton={false}
            style={{
              width: isMobileRowLayout ? MAX_EDITOR_IPHONE_SE_MOBILE_WIDTH : undefined,
              height:
                isMobileRowLayout || isMobileColumnLayout
                  ? MAX_EDITOR_IPHONE_SE_MOBILE_HEIGHT
                  : (!editorShown && previewHeight) || codeEditorHeight || MIN_EDITOR_HEIGHT,
            }}
          />
          {editorShown && (
            <SandpackCodeEditor
              showTabs={false}
              style={{
                height: codeEditorHeight,
                width: '100%',
                flex: ['mobileColumn', 'column'].includes(layout) ? 'none' : null,
              }}
              wrapContent
            />
          )}
        </SandpackLayout>
      </Box>
      <Box
        display={hideControls ? undefined : 'none'}
        height={hideControls ? 24 : undefined}
        marginTop={2}
      />
      {!hideControls && (
        <Box marginTop={2}>
          <Flex alignItems="center" gap={2} justifyContent="end">
            <CodeExampleDarkModeButton
              currentMode={exampleColorScheme}
              onClick={toggleExampleColorScheme}
            />

            <CodeExampleTextDirectionButton
              currentTextDirection={exampleTextDirection}
              onClick={toggleExampleTextDirection}
            />

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
      )}
    </Fragment>
  );
}

export default function SandpackExample({
  code,
  layout = 'row',
  name,
  previewHeight,
  hideControls,
  hideEditor,
}: {
  code: ?string | (() => ReactNode),
  layout?: 'row' | 'column' | 'mobileRow' | 'mobileColumn',
  name: string,
  previewHeight?: number,
  hideControls?: boolean,
  hideEditor?: boolean,
}): ReactNode {
  const { files } = useLocalFiles();
  const { colorScheme, devExampleMode, helixBot, textDirection } = useAppContext();
  const [exampleColorScheme, setExampleColorScheme] = useState<'light' | 'dark'>(colorScheme);
  const [exampleTextDirection, setExampleTextDirection] = useState<'ltr' | 'rtl'>(textDirection);
  const experimentsObj = useDocsExperiments();
  // If the user changes the color scheme or text direction, update examples
  useEffect(() => {
    setExampleColorScheme(colorScheme);
    setExampleTextDirection(textDirection);
  }, [colorScheme, textDirection]);

  if (helixBot) return null;

  return devExampleMode === 'default' ? (
    <SandpackProvider
      // Based on https://github.com/codesandbox/sandpack/blob/53811bb4fdfb66ea95b9881ff18c93307f12ce0d/sandpack-react/src/presets/Sandpack.tsx#L67
      customSetup={{
        dependencies: {
          ...(files
            ? { classnames: 'latest' }
            : {
                gestalt: 'latest',
                'gestalt-charts': 'latest',
                'gestalt-datepicker': 'latest',
              }),
          react: '18.2.0',
          'react-dom': '18.2.0',
        },
      }}
      files={{
        '/styles.css': {
          code: `@import "gestalt/dist/gestalt.css";
          @import "gestalt-datepicker/dist/gestalt-datepicker.css";
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
              '/node_modules/gestalt-charts/package.json': {
                code: JSON.stringify({
                  name: 'gestalt-charts',
                  main: './dist/gestalt-charts.js',
                }),
                hidden: true,
              },
              '/node_modules/gestalt-datepicker/package.json': {
                code: JSON.stringify({
                  name: 'gestalt-datepicker',
                  main: './dist/gestalt-datepicker.js',
                  style: 'dist/gestalt-datepicker.css',
                }),
                hidden: true,
              },
              '/node_modules/gestalt/dist/gestalt.js': {
                code: files.js,
                hidden: true,
              },
              '/node_modules/gestalt-charts/dist/gestalt-charts.js': {
                code: files.js,
                hidden: true,
              },
              '/node_modules/gestalt-datepicker/dist/gestalt-datepicker.js': {
                code: files.js,
                hidden: true,
              },
              '/node_modules/gestalt/dist/gestalt.css': {
                code: files.css,
                hidden: true,
              },
              '/node_modules/gestalt-datepicker/dist/gestalt-datepicker.css': {
                code: files.css,
                hidden: true,
              },
            }
          : {}),
        '/App.js': {
          code,
        },
        '/index.js': {
          code: `import React, { StrictMode } from "react";
          import { createRoot } from "react-dom/client";
          import "./styles.css";
          import { Box, ColorSchemeProvider, ExperimentProvider } from 'gestalt';
          import App from "./App";

          const html = document.querySelector('html');
          html.setAttribute('dir', '${exampleTextDirection}');

          const root = createRoot(document.getElementById("root"));
          root.render(
            <StrictMode>
              <ExperimentProvider value={${JSON.stringify(experimentsObj)}}>
                <ColorSchemeProvider colorScheme="${exampleColorScheme}" fullDimensions>
                  <Box color="default" height="100%" width="100%">
                    <App />
                  </Box>
                </ColorSchemeProvider>
              </ExperimentProvider>
            </StrictMode>
          );`,
        },
      }}
      template="react"
      theme="dark"
    >
      <SandpackContainer
        exampleColorScheme={exampleColorScheme}
        exampleTextDirection={exampleTextDirection}
        hideControls={hideControls}
        hideEditor={hideEditor}
        layout={layout}
        name={name}
        previewHeight={previewHeight}
        toggleExampleColorScheme={() =>
          setExampleColorScheme((currVal) => (currVal === 'dark' ? 'light' : 'dark'))
        }
        toggleExampleTextDirection={() =>
          setExampleTextDirection((currVal) => (currVal === 'ltr' ? 'rtl' : 'ltr'))
        }
      />
    </SandpackProvider>
  ) : (
    <DevelopmentEditor code={code} />
  );
}
