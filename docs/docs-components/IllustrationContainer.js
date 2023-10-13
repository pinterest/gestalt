// @flow strict
import { type Node } from 'react';
import { Box } from 'gestalt';

type Props = {
  children?: Node,
  justifyContent?: 'center' | 'start',
};

function IllustrationContainer({ children, justifyContent = 'center' }: Props): Node {
  return (
    <Box
      smMarginEnd={0}
      smMarginStart={0}
      paddingX={12}
      smPaddingX={2}
      mdPaddingX={8}
      marginBottom={10}
      justifyContent={justifyContent}
      display="flex"
    >
      {children}
    </Box>
  );
}

export default IllustrationContainer;
