// @flow strict
import { type Node as ReactNode } from 'react';
import { Box } from 'gestalt';

type Props = {
  children?: ReactNode,
  justifyContent?: 'center' | 'start',
};

function IllustrationContainer({ children, justifyContent = 'center' }: Props): ReactNode {
  return (
    <Box
      display="flex"
      justifyContent={justifyContent}
      marginBottom={10}
      mdPaddingX={8}
      paddingX={12}
      smMarginEnd={0}
      smMarginStart={0}
      smPaddingX={2}
    >
      {children}
    </Box>
  );
}

export default IllustrationContainer;
