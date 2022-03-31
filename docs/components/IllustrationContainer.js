// @flow strict
import { Box } from 'gestalt';
import { type Node } from 'react';

type Props = {|
  children?: Node,
  justifyContent?: 'center' | 'start',
|};

function IllustrationContainer({ children, justifyContent = 'center' }: Props): Node {
  return (
    <Box
      marginStart={-8}
      marginEnd={-8}
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
