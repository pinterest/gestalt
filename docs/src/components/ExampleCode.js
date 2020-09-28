// @flow strict
import React, { useEffect, useRef, useState, type Node } from 'react';
import { Box, Button, IconButton, Stack, Text, Tooltip } from 'gestalt';
import { LiveEditor } from 'react-live';
import handleCodeSandbox from './handleCodeSandbox.js';
import clipboardCopy from './clipboardCopy.js';

async function copyCode({ code }: {| code: string |}) {
  try {
    await clipboardCopy(code);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
}

export default function ExampleCode({
  code,
  name,
}: {|
  code: string,
  name: string,
|}): Node {
  const [expanded, setExpanded] = useState(true);
  const codeExampleRef = useRef(null);
  const CODE_EXAMPLE_HEIGHT = 100;

  useEffect(() => {
    const height = codeExampleRef?.current?.clientHeight ?? 0;
    if (height - 80 > CODE_EXAMPLE_HEIGHT) {
      setExpanded(false);
    }
  }, [code]);

  return (
    <Box paddingX={2}>
      <Stack gap={2}>
        <Text size="md" color="gray">
          Editor
        </Text>

        <Box display="flex" direction="column">
          <Box
            position="relative"
            display="flex"
            color="darkGray"
            ref={codeExampleRef}
            {...(expanded
              ? {}
              : { maxHeight: CODE_EXAMPLE_HEIGHT, overflow: 'hidden' })}
          >
            <Box flex="grow">
              {/* We can not pass in an id for LiveEditor which links to the underlying text area */}
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>
                <LiveEditor padding={16} />
              </label>
            </Box>
            <Box padding={2} display="flex" direction="column">
              <Tooltip inline text="Open in CodeSandbox">
                <IconButton
                  dangerouslySetSvgPath={{
                    __path:
                      'M9.365 21.17v-8.645L1.93 8.248v4.928l3.405 1.974v3.705l4.029 2.314zm1.93.05l4.104-2.363v-3.794l3.427-1.986V8.211l-7.53 4.348v8.661zm6.54-14.666L13.878 4.26l-3.475 2.017L6.9 4.257 2.907 6.583l7.452 4.288 7.477-4.316zM0 18.017V6.04L10.377 0l10.38 6.015v11.983l-10.38 5.98L0 18.018z',
                  }}
                  accessibilityLabel="Open in CodeSandbox"
                  iconColor="white"
                  onClick={() => {
                    handleCodeSandbox({ code, title: name });
                  }}
                />
              </Tooltip>

              <Tooltip inline text="Copy Code">
                <IconButton
                  dangerouslySetSvgPath={{
                    __path:
                      'M22.696 5.13c.348 0 .652.13.913.392.26.26.391.565.391.913v16.217c0 .348-.13.652-.391.913s-.566.391-.913.391H9.87c-.348 0-.653-.13-.913-.39a1.251 1.251 0 01-.392-.914v-3.826h-7.26c-.348 0-.653-.13-.914-.391A1.251 1.251 0 010 17.522v-9c0-.348.087-.74.26-1.174.175-.435.392-.783.653-1L6.348.913c.26-.26.609-.478 1-.652C7.783.087 8.174 0 8.522 0h5.565c.348 0 .652.13.913.391.26.261.391.566.391.913v4.392c.609-.348 1.174-.522 1.696-.522h5.609V5.13zm-7.261 2.827l-4 4h4v-4zM6.87 2.827l-4 4h4v-4zm2.608 8.651l4.218-4.217V1.696h-5.13V7.26c0 .348-.131.652-.392.913-.261.26-.565.391-.913.391H1.739v8.522h6.826v-3.435c0-.348.087-.739.261-1.174.217-.434.435-.739.652-1zm12.783 10.74V6.825h-5.13v5.565c0 .348-.131.652-.392.913-.26.261-.565.392-.913.392h-5.522v8.521h11.957z',
                  }}
                  accessibilityLabel="Copy Code"
                  iconColor="white"
                  onClick={() => {
                    copyCode({ code });
                  }}
                />
              </Tooltip>
            </Box>
          </Box>
          {expanded ? null : (
            <Box alignSelf="end" marginTop={2}>
              <Button
                onClick={() => setExpanded(true)}
                accessibilityLabel={`Expand code for ${name}`}
                inline
                text="Expand code"
              />
            </Box>
          )}
        </Box>
      </Stack>
    </Box>
  );
}
