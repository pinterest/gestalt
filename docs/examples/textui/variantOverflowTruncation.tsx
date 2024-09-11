import { Box, Flex, TextUI } from 'gestalt';

export default function Example() {
  return (
    <Flex height="100%" justifyContent="center" width="100%">
      <Flex direction="column" gap={{ column: 2, row: 0 }} width={200}>
        <TextUI>breakWord (default):</TextUI>
        <Box color="secondary" padding={2} rounding={2}>
          <TextUI>
            This is a long and Supercalifragilisticexpialidocious sentence.
            次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
          </TextUI>
        </Box>

        <TextUI>normal:</TextUI>
        <Box color="secondary" padding={2} rounding={2}>
          <TextUI overflow="normal">
            This is a long and Supercalifragilisticexpialidocious sentence.
            次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
          </TextUI>
        </Box>

        <TextUI>breakAll:</TextUI>
        <Box color="secondary" padding={2} rounding={2}>
          <TextUI overflow="breakAll">
            This is a long and Supercalifragilisticexpialidocious sentence.
            次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
          </TextUI>
        </Box>

        <TextUI>lineClamp:</TextUI>
        <Box color="secondary" padding={2} rounding={2}>
          <TextUI lineClamp={2}>
            This is a long and Supercalifragilisticexpialidocious sentence.
            次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
          </TextUI>
        </Box>
      </Flex>
    </Flex>
  );
}
