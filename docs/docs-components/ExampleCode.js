// @flow strict
import { type Node as ReactNode, useEffect, useRef, useState } from 'react';
import { LiveEditor } from 'react-live';
import { Box, Flex, Text } from 'gestalt';
import { useAppContext } from './appContext';
import CollapseExpandCodeButton from './buttons/CollapseExpandCodeButton';
import CopyCodeButton from './buttons/CopyCodeButton';
import OpenSandboxButton from './buttons/OpenSandboxButton';
import clipboardCopy from './clipboardCopy';
import handleCodeSandbox from './handleCodeSandbox';

const CODE_EXAMPLE_HEIGHT = 162;

async function copyCode({ code }: { code: string }) {
  try {
    await clipboardCopy(code);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
}

type Props = {
  code: string,
  name: string,
  readOnly?: boolean,
  hideCodePreview?: boolean,
  developmentEditor?: boolean,
};

export default function ExampleCode({
  code,
  hideCodePreview = false,
  readOnly,
  name,
  developmentEditor,
}: Props): ReactNode {
  const { devExampleMode } = useAppContext();

  const [expanded, setExpanded] = useState(developmentEditor);
  const [showExpandButton, setShowExpandButton] = useState(hideCodePreview);
  const [maxHeight, setMaxHeight] = useState('500px');
  const codeExampleRef = useRef<null | HTMLDivElement>(null);
  const codeBoxMinHeight = hideCodePreview ? undefined : '152px';
  let containerBoxMaxHeight;

  // If an example is expanded, maxHeight should be the full code's height
  // If !expanded, code blocks that hide the preview should have no min height
  // All others have small min height
  if (expanded) {
    containerBoxMaxHeight = maxHeight;
  } else if (hideCodePreview) {
    containerBoxMaxHeight = '0';
  } else {
    containerBoxMaxHeight = CODE_EXAMPLE_HEIGHT;
  }

  useEffect(() => {
    const height = codeExampleRef?.current?.clientHeight ?? 0;

    // Save the height so we know how far to animate to
    setMaxHeight(`${height}px`);

    if (height > CODE_EXAMPLE_HEIGHT && devExampleMode === 'default') {
      setExpanded(false);
      setShowExpandButton(true);
    }
  }, [code, hideCodePreview, devExampleMode]);

  return (
    <Box marginTop={2}>
      <Flex
        direction="column"
        gap={{
          row: 0,
          column: 2,
        }}
      >
        <Flex
          alignItems="center"
          gap={{
            row: 2,
            column: 0,
          }}
          justifyContent="between"
        >
          <Flex justifyContent="start">
            <OpenSandboxButton
              onClick={() => {
                handleCodeSandbox({ code, title: name });
              }}
            />

            <CopyCodeButton
              onClick={() => {
                copyCode({ code });
              }}
            />

            {showExpandButton && (
              <CollapseExpandCodeButton
                expanded={!!expanded}
                name={name}
                onClick={() => setExpanded(!expanded)}
              />
            )}
          </Flex>
          {readOnly && (
            <Box>
              <Text italic size="100">
                Edits made below will not be reflected in the example above, open the sandbox
                instead.
              </Text>
            </Box>
          )}
        </Flex>
        <Flex direction="column" width="100%">
          <Box
            display="flex"
            maxHeight={containerBoxMaxHeight}
            overflow="hidden"
            position="relative"
            rounding={2}
          >
            <Box
              flex="grow"
              onFocus={() => {
                setExpanded(true);
              }}
            >
              <div
                ref={codeExampleRef}
                className={!expanded ? 'LiveEditor__textarea__notExpanded' : undefined}
              >
                {/* We can not pass in an id for LiveEditor which links to the underlying text area */}
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label>
                  <LiveEditor
                    // Don't remove this className or all the a11y integration tests will fail
                    className="live-editor-pane"
                    padding={16}
                    style={{
                      minHeight: codeBoxMinHeight,
                    }}
                  />
                </label>
              </div>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
