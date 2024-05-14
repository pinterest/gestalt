// @flow strict
import React, { Fragment, type Node as ReactNode, useEffect, useState } from 'react';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live-runner';
import { SandpackLayout, useSandpack } from '@codesandbox/sandpack-react';
import { Box, Flex } from 'gestalt';
import * as gestalt from 'gestalt'; // eslint-disable-line import/no-namespace
import * as gestaltChart from 'gestalt-charts'; // eslint-disable-line import/no-namespace
import * as gestaltDatepicker from 'gestalt-datepicker'; // eslint-disable-line import/no-namespace
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
import vsDark from './vsDark';

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
  // const { sandpack } = useSandpack();

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
        <LiveError />
        <LivePreview
          // showOpenInCodeSandbox={false}
          // showRefreshButton={false}
          style={{
            width: isMobileRowLayout ? MAX_EDITOR_IPHONE_SE_MOBILE_WIDTH : undefined,
            height:
              isMobileRowLayout || isMobileColumnLayout
                ? MAX_EDITOR_IPHONE_SE_MOBILE_HEIGHT
                : (!editorShown && previewHeight) || codeEditorHeight || MIN_EDITOR_HEIGHT,
          }}
        />
        {editorShown && (
          <LiveEditor
            // showTabs={false}
            style={{
              height: codeEditorHeight,
              width: '100%',
              flex: ['mobileColumn', 'column'].includes(layout) ? 'none' : null,
              // overflow: 'auto',
            }}
            // wrapContent
          />
        )}
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

            {/* <OpenInCodeSandboxButton /> */}

            <CopyCodeButton
              onClick={() => {
                // const code = sandpack?.files?.['/App.js']?.code;
                // copyCode({ code });
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

export default function LiveExample({
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

  const scope = {
    import: {
      react: React,
      gestalt,
      'gestalt-charts': gestaltChart,
      'gestalt-datepicker': gestaltDatepicker,
    },
  };

  if (helixBot) return null;

  return (
    <LiveProvider code={code?.toString()} scope={scope} theme={vsDark}>
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
    </LiveProvider>
  );
}
