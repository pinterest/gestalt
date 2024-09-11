import { Box, Flex, TextUI } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex alignItems="start" direction="column" gap={{ column: 4, row: 0 }}>
        <TextUI>Some content in a default block element. (default)</TextUI>
        <Box>
          <TextUI inline>Inline text with the inline prop.</TextUI>{' '}
          <TextUI inline>More inline text.</TextUI>
        </Box>
      </Flex>
    </Flex>
  );
}
