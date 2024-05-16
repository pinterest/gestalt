import { ReactNode } from 'react';
import { Box, Flex, Heading, Text } from 'gestalt';

export default function Example() {
  return (
    <Box display="flex" justifyContent="center" padding={8}>
      <Flex direction="column" gap={{ column: 8, row: 0 }} maxWidth={240}>
        <Flex direction="column" gap={{ column: 2, row: 0 }}>
          <Text>breakWord (default):</Text>
          <Box color="secondary" padding={2} rounding={2}>
            <Heading overflow="breakWord" size="400">
              This is a long and Supercalifragilisticexpialidocious sentence.
              次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
            </Heading>
          </Box>
        </Flex>

        <Flex direction="column" gap={{ column: 2, row: 0 }}>
          <Text>normal:</Text>
          <Box color="secondary" padding={2} rounding={2}>
            <Heading overflow="normal" size="400">
              This is a long and Supercalifragilisticexpialidocious sentence.
              次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
            </Heading>
          </Box>
        </Flex>

        <Flex direction="column" gap={{ column: 2, row: 0 }}>
          <Text>breakAll:</Text>
          <Box color="secondary" padding={2} rounding={2}>
            <Heading overflow="breakAll" size="400">
              This is a long and Supercalifragilisticexpialidocious sentence.
              次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
            </Heading>
          </Box>
        </Flex>

        <Flex direction="column" gap={{ column: 2, row: 0 }}>
          <Text>lineClamp:</Text>
          <Box color="secondary" padding={2} rounding={2}>
            <Heading lineClamp={2} size="400">
              This is a long and Supercalifragilisticexpialidocious sentence.
              次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
            </Heading>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
