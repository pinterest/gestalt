import { Box, Flex, TextUI } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex alignItems="start" direction="column" gap={{ column: 3, row: 0 }}>
        <TextUI color="default">Default</TextUI>
        <TextUI color="subtle">Subtle</TextUI>
        <Box color="inverse" padding={1}>
          <TextUI color="inverse">Inverse</TextUI>
        </Box>
        <TextUI color="disabled">Disabled</TextUI>
        <TextUI color="error">Error</TextUI>
        <TextUI color="success">Success</TextUI>
        <TextUI color="warning">Warning</TextUI>
        <TextUI color="recommendation">Recommendation</TextUI>
        <TextUI color="link">Link</TextUI>
        <TextUI color="shopping">Shopping</TextUI>
        <Box color="primary" padding={1}>
          <TextUI color="light">Light</TextUI>
        </Box>
        <Box color="infoWeak" padding={1}>
          <TextUI color="dark">Dark</TextUI>
        </Box>
      </Flex>
    </Flex>
  );
}
