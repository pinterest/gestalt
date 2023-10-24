// @flow strict
import { type Node } from 'react';
import { Box, CompositeZIndex, Link as GestaltLink, Text, Tooltip } from 'gestalt';
import trackButtonClick from './buttons/trackButtonClick.js';

export default function HeaderMenu({
  isHeader,
  popoverZIndex,
}: {
  isHeader?: boolean,
  popoverZIndex?: CompositeZIndex,
}): Node {
  return (
    <Box
      alignItems="center"
      display={isHeader ? 'none' : 'flex'}
      mdDisplay={isHeader ? 'flex' : 'none'}
      justifyContent={isHeader ? undefined : 'center'}
    >
      <Tooltip
        inline
        text="Opens CodeSandbox ready to start coding with Gestalt"
        zIndex={popoverZIndex}
      >
        <Text>
          <GestaltLink
            href="https://codesandbox.io/s/gestalt-cnwugg?file=/yourCode.js"
            onClick={() => trackButtonClick('Playground')}
            target="blank"
          >
            <Box padding={2}>Playground</Box>
          </GestaltLink>
        </Text>
      </Tooltip>

      <Tooltip inline text="View source code" zIndex={popoverZIndex}>
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
