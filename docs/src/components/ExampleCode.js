// @flow strict
import React, { type Node, useEffect, useRef, useState } from 'react';
import { Box, Flex } from 'gestalt';
import { LiveEditor } from 'react-live';
import clipboardCopy from './clipboardCopy.js';
import handleCodeSandbox from './handleCodeSandbox.js';
import CollapseExpandCodeButton from './buttons/CollapseExpandCodeButton.js';
import CopyCodeButton from './buttons/CopyCodeButton.js';
import OpenSandboxButton from './buttons/OpenSandboxButton.js';

async function copyCode({ code }: {| code: string |}) {
  try {
    await clipboardCopy(code);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
}

export default function ExampleCode({ code, name }: {| code: string, name: string |}): Node {
  const [expanded, setExpanded] = useState(true);
  const [showExpandButton, setShowExpandButton] = useState(false);
  const codeExampleRef = useRef(null);
  const CODE_EXAMPLE_HEIGHT = 152;

  useEffect(() => {
    const height = codeExampleRef?.current?.clientHeight ?? 0;
    if (height - 80 > CODE_EXAMPLE_HEIGHT) {
      setExpanded(false);
      setShowExpandButton(true);
    }
  }, [code]);

  return (
    <Box marginTop={2}>
      <Flex direction="column" gap={2}>
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
              expanded={expanded}
              name={name}
              onClick={() => setExpanded(!expanded)}
            />
          )}
        </Flex>

        <Flex direction="column" width="100%">
          <Box
            borderStyle="sm"
            display="flex"
            overflow="hidden"
            position="relative"
            ref={codeExampleRef}
            rounding={2}
            {...(expanded ? {} : { maxHeight: CODE_EXAMPLE_HEIGHT, overflow: 'hidden' })}
          >
            <Box
              flex="grow"
              onFocus={() => {
                setExpanded(true);
              }}
            >
              {/* We can not pass in an id for LiveEditor which links to the underlying text area */}
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>
                <LiveEditor
                  className="live-editor-pane"
                  style={{
                    minHeight: '152px',
                  }}
                  padding={16}
                />
              </label>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
