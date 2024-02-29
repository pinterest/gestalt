// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Flex } from 'gestalt';
import { TOKEN_COLOR_PINK_FLAMINGLOW_400 } from 'gestalt-design-tokens/dist/js/constants';

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Box
        dangerouslySetInlineStyle={{
          __style: {
            backgroundColor: TOKEN_COLOR_PINK_FLAMINGLOW_400,
          },
        }}
        height={100}
        width={100}
      />
    </Flex>
  );
}
