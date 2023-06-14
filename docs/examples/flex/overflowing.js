// @flow strict
import { type Node } from 'react';
import { Badge, Box, Flex, Icon, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex width="100%" height="100%" justifyContent="center" alignItems="center">
      <Box padding={3} rounding={3}>
        <Flex alignItems="center" gap={3}>
          <Icon accessibilityLabel="Private" icon="lock" />
          <Flex.Item minWidth={0}>
            <Text lineClamp={2}>
              Some really long title text that just keeps going and going and going and going and
              going and going and going and going and going and going and going and going and going
              and going and going and going
            </Text>
          </Flex.Item>
          <Badge text="Try it out!" />
        </Flex>
      </Box>
    </Flex>
  );
}
