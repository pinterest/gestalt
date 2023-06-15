// @flow strict
import { type Node } from 'react';
import { Box, Flex, Heading, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} display="flex" justifyContent="center">
      <Flex maxWidth={240} direction="column" gap={{ column: 8, row: 0 }}>
        <Flex direction="column" gap={{ column: 2, row: 0 }}>
          <Text>breakWord (default):</Text>
          <Box color="secondary" padding={2} rounding={2}>
            <Heading size="400" overflow="breakWord">
              This is a long and Supercalifragilisticexpialidocious sentence.
              次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
            </Heading>
          </Box>
        </Flex>

        <Flex direction="column" gap={{ column: 2, row: 0 }}>
          <Text>normal:</Text>
          <Box color="secondary" padding={2} rounding={2}>
            <Heading size="400" overflow="normal">
              This is a long and Supercalifragilisticexpialidocious sentence.
              次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
            </Heading>
          </Box>
        </Flex>

        <Flex direction="column" gap={{ column: 2, row: 0 }}>
          <Text>lineClamp:</Text>
          <Box color="secondary" padding={2} rounding={2}>
            <Heading size="400" lineClamp={2}>
              This is a long and Supercalifragilisticexpialidocious sentence.
              次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
            </Heading>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
