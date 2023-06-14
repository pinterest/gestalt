// @flow strict
import { Box, Heading, Modal, Text as RenamedText,Text } from 'gestalt';

export default function TestBox() {
  return (
    <Box>
      <Text inline align="start" size="sm">Text</Text>
      <Text align="end">Text</Text>
      <Text align="center">Text</Text>
      <Heading align="start">Heading</Heading>
      <Heading align="end" />
      <RenamedText align="start">Text</RenamedText>
      <Modal accessibilityModalLabel="Label" onDismiss={() => {}} align="start" />
    </Box>
  );
}
