import { Box, Flex, TextCompact } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex alignItems="start" direction="column" gap={{ column: 4, row: 0 }}>
        <TextCompact>Some content in a default block element. (default)</TextCompact>
        <Box>
          <TextCompact inline>Inline text with the inline prop.</TextCompact>{' '}
          <TextCompact inline>More inline text.</TextCompact>
        </Box>
      </Flex>
    </Flex>
  );
}
