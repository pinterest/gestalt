// @flow strict
import { Box, Flex } from 'gestalt';

export default function Example(): React$Node {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Box
        dangerouslySetInlineStyle={{
          __style: {
            backgroundColor: 'var(--color-pink-flaminglow-400)',
          },
        }}
        height={100}
        width={100}
      />
    </Flex>
  );
}
