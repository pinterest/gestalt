// @flow strict
import React, { useEffect, useRef, useState, type Node } from 'react';
import { Box, IconButton, Tooltip } from 'gestalt';
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
    <>
      <Box display="flex" direction="row" justifyContent="start" marginTop={2}>
        <Tooltip inline text="Open in CodeSandbox" idealDirection="up">
          <IconButton
            dangerouslySetSvgPath={{
              __path:
                'M9.365 21.17v-8.645L1.93 8.248v4.928l3.405 1.974v3.705l4.029 2.314zm1.93.05l4.104-2.363v-3.794l3.427-1.986V8.211l-7.53 4.348v8.661zm6.54-14.666L13.878 4.26l-3.475 2.017L6.9 4.257 2.907 6.583l7.452 4.288 7.477-4.316zM0 18.017V6.04L10.377 0l10.38 6.015v11.983l-10.38 5.98L0 18.018z',
            }}
            accessibilityLabel="Open in CodeSandbox"
            iconColor="darkGray"
            size="sm"
            onClick={() => {
              handleCodeSandbox({ code, title: name });
            }}
          />
        </Tooltip>
        <Tooltip inline text="Copy Code" idealDirection="up">
          <IconButton
            dangerouslySetSvgPath={{
              __path:
                'M15.25 0h-6.5a1.75 1.75 0 000 3.5h6.5a5.256 5.256 0 015.25 5.25v6.5a1.75 1.75 0 103.5 0v-6.5C24 3.925 20.075 0 15.25 0zm-.75 6.5H3a3 3 0 00-3 3V21a3 3 0 003 3h11.5a3 3 0 003-3V9.5a3 3 0 00-3-3z',
            }}
            accessibilityLabel="Copy Code"
            iconColor="darkGray"
            size="sm"
            onClick={() => {
              copyCode({ code });
            }}
          />
        </Tooltip>
        <Tooltip
          inline
          text={`${expanded ? 'Collapse' : 'Expand'} code example`}
          idealDirection="up"
        >
          <IconButton
            accessibilityLabel={`${
              expanded ? 'Collapse' : 'Expand'
            } code for ${name}`}
            iconColor="darkGray"
            icon={expanded ? 'eye-hide' : 'eye'}
            size="sm"
            onClick={() => setExpanded(!expanded)}
          />
        </Tooltip>
      </Box>
      <Box display="flex" direction="column" width="100%" marginTop={2}>
        <Box
          position="relative"
          display="flex"
          color="darkGray"
          ref={codeExampleRef}
          overflow="hidden"
          rounding={2}
          {...(expanded
            ? {}
            : { maxHeight: CODE_EXAMPLE_HEIGHT, overflow: 'hidden' })}
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
              <LiveEditor padding={16} />
            </label>
          </Box>
        </Box>
      </Box>
    </>
  );
}
