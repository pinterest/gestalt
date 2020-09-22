// @flow strict
import React, { useEffect, useRef, useState, type Node } from 'react';
import { Box, Button, IconButton, Stack, Text, Tooltip } from 'gestalt';
import { LiveEditor } from 'react-live';
import handleCodeSandbox from './handleCodeSandbox.js';

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
            <Box padding={2}>
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
