// @flow strict
import { Box, Heading, Modal, Text as RenamedText,Text } from 'gestalt';

export default function TestBox() {
  return (
    <Box>
      <Text inline align="left" size="sm">Text</Text>
      <Text align="right">Text</Text>
      <Text align="center">Text</Text>
      <Heading align="left">Heading</Heading>
      <Heading align="right" />
      <RenamedText align="left">Text</RenamedText>
      <Modal accessibilityModalLabel="Label" onDismiss={() => {}} align="left" />
    </Box>
  );
}
