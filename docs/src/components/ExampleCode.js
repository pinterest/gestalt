// @flow strict
import { type Node, useEffect, useRef, useState } from 'react';
import { Box, Flex } from 'gestalt';
import { LiveEditor } from 'react-live';
import clipboardCopy from './clipboardCopy.js';
import handleCodeSandbox from './handleCodeSandbox.js';
import CollapseExpandCodeButton from './buttons/CollapseExpandCodeButton.js';
import CopyCodeButton from './buttons/CopyCodeButton.js';
import OpenSandboxButton from './buttons/OpenSandboxButton.js';
import './ExampleCode.css';

const CODE_EXAMPLE_HEIGHT = 162;

async function copyCode({ code }: {| code: string |}) {
  try {
    await clipboardCopy(code);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
}

type Props = {|
  code: string,
  name: string,
|};

export default function ExampleCode({ code, name }: Props): Node {
  const [expanded, setExpanded] = useState(true);
  const [showExpandButton, setShowExpandButton] = useState(false);
  const codeExampleRef = useRef(null);

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
            maxHeight={!expanded ? CODE_EXAMPLE_HEIGHT : undefined}
            position="relative"
            ref={codeExampleRef}
            rounding={2}
          >
            <Box
              flex="grow"
              onFocus={() => {
                setExpanded(true);
              }}
            >
              <div className={!expanded ? 'LiveEditor__textarea__notExpanded' : undefined}>
                {/* We can not pass in an id for LiveEditor which links to the underlying text area */}
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label>
                  <LiveEditor
                    padding={16}
                    style={{
                      minHeight: '152px',
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
