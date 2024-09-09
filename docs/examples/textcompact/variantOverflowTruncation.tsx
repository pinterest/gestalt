import { Box, Flex, TextCompact } from 'gestalt';

export default function Example() {
  return (
    <Flex height="100%" justifyContent="center" width="100%">
      <Flex direction="column" gap={{ column: 2, row: 0 }} width={200}>
        <TextCompact>breakWord (default):</TextCompact>
        <Box color="secondary" padding={2} rounding={2}>
          <TextCompact>
            This is a long and Supercalifragilisticexpialidocious sentence.
            次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
          </TextCompact>
        </Box>

        <TextCompact>normal:</TextCompact>
        <Box color="secondary" padding={2} rounding={2}>
          <TextCompact overflow="normal">
            This is a long and Supercalifragilisticexpialidocious sentence.
            次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
          </TextCompact>
        </Box>

        <TextCompact>breakAll:</TextCompact>
        <Box color="secondary" padding={2} rounding={2}>
          <TextCompact overflow="breakAll">
            This is a long and Supercalifragilisticexpialidocious sentence.
            次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
          </TextCompact>
        </Box>

        <TextCompact>lineClamp:</TextCompact>
        <Box color="secondary" padding={2} rounding={2}>
          <TextCompact lineClamp={2}>
            This is a long and Supercalifragilisticexpialidocious sentence.
            次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
          </TextCompact>
        </Box>
      </Flex>
    </Flex>
  );
}
