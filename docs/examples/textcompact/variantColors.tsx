import { Box, Flex, TextCompact } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex alignItems="start" direction="column" gap={{ column: 3, row: 0 }}>
        <TextCompact color="default">Default</TextCompact>
        <TextCompact color="subtle">Subtle</TextCompact>
        <Box color="inverse" padding={1}>
          <TextCompact color="inverse">Inverse</TextCompact>
        </Box>
        <TextCompact color="disabled">Disabled</TextCompact>
        <TextCompact color="error">Error</TextCompact>
        <TextCompact color="success">Success</TextCompact>
        <TextCompact color="warning">Warning</TextCompact>
        <TextCompact color="recommendation">Recommendation</TextCompact>
        <TextCompact color="link">Link</TextCompact>
        <TextCompact color="shopping">Shopping</TextCompact>
        <Box color="primary" padding={1}>
          <TextCompact color="light">Light</TextCompact>
        </Box>
        <Box color="infoWeak" padding={1}>
          <TextCompact color="dark">Dark</TextCompact>
        </Box>
      </Flex>
    </Flex>
  );
}
