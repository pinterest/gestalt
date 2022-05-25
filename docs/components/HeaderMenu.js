// @flow strict
import { type Node } from 'react';
import { Box, Link as GestaltLink, Text, Tooltip } from 'gestalt';
import trackButtonClick from './buttons/trackButtonClick.js';

export default function HeaderMenu({ isHeader }: {| isHeader?: boolean |}): Node {
  return (
    <Box
      alignItems="center"
      display={isHeader ? 'none' : 'flex'}
      mdDisplay={isHeader ? 'flex' : 'none'}
      justifyContent={isHeader ? undefined : 'center'}
    >
      <Tooltip inline text="Opens CodeSandbox ready to start coding with Gestalt">
        <Text>
          <GestaltLink
            href="https://codesandbox.io/s/k5plvp9v8v"
            onClick={() => trackButtonClick('Playground')}
            target="blank"
          >
            <Box padding={2}>Playground</Box>
          </GestaltLink>
        </Text>
      </Tooltip>

      <Tooltip inline text="Check out the source code on GitHub">
        <Text>
          <GestaltLink
            href="https://github.com/pinterest/gestalt"
            onClick={() => trackButtonClick('GitHub')}
            target="blank"
          >
            <Box padding={2}>GitHub</Box>
          </GestaltLink>
        </Text>
      </Tooltip>
    </Box>
  );
}
