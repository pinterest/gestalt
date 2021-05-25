// @flow strict
import { Box, Heading, Modal, Text, Text as RenamedText } from 'gestalt';

export default function TestBox() {
  return (
    <Box>
      <Text inline align="start" size="sm">Text</Text>
      <Text align="end">Text</Text>
      <Text align="center">Text</Text>
      <Heading align="start">Heading</Heading>
      <Heading align="end" />
      <RenamedText align="start">Text</RenamedText>
      <Modal accessibilityModalLabel="Label" onDismiss={() => {}} align="left" />
    </Box>
  );
}
