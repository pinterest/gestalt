// @flow strict
import { type Node } from 'react';
import { Box, Flex, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex justifyContent="center" width="100%" height="100%">
      <Flex direction="column" gap={{ column: 2, row: 0 }} width={200}>
        <Text>breakWord (default):</Text>
        <Box color="secondary" padding={2} rounding={2}>
          <Text>
            This is a long and Supercalifragilisticexpialidocious sentence.
            次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
          </Text>
        </Box>

        <Text>normal:</Text>
        <Box color="secondary" padding={2} rounding={2}>
          <Text overflow="normal">
            This is a long and Supercalifragilisticexpialidocious sentence.
            次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
          </Text>
        </Box>

        <Text>breakAll:</Text>
        <Box color="secondary" padding={2} rounding={2}>
          <Text overflow="breakAll">
            This is a long and Supercalifragilisticexpialidocious sentence.
            次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
          </Text>
        </Box>

        <Text>lineClamp:</Text>
        <Box color="secondary" padding={2} rounding={2}>
          <Text lineClamp={2}>
            This is a long and Supercalifragilisticexpialidocious sentence.
            次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
}
