// @flow strict
import { type Node } from 'react';
import { Box, Flex, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex gap={{ column: 2, row: 0 }} direction="column">
        <Text weight="bold" size="500">
          (H1) The creator code
        </Text>
        <Text size="200">
          (p) Pinterest is building a positive online space for creators. That’s why we made the
          Creator Code: A commitment to kindness for everyone on Pinterest. We expect everyone to
          follow these guidelines and lead with kindness when you create new content or interact
          with other people on Pinterest.
        </Text>
        <Text weight="bold" size="400">
          (H2) Be kind
        </Text>
        <Text weight="bold" size="300">
          (H3) Express yourself
        </Text>
        <Text size="200">
          (p) Great content should highlight you and your ideas. Put your original spin on something
          and don’t be afraid to let your own perspective shine. For example: Fashion inspiration to
          freshen up a wardrobe.
        </Text>
      </Flex>
    </Box>
  );
}
