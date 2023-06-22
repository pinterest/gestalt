// @flow strict
import { type Node } from 'react';
import { Button, ColorSchemeProvider, Flex, SheetMobile, Text } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="light">
      <SheetMobile
        heading="Heading"
        subHeading="SubHeading"
        primaryAction={{ accessibilityLabel: 'Next page', label: 'Next', onClick: () => {} }}
        onDismiss={() => {}}
        footer={
          <Flex justifyContent="center" gap={2}>
            <Button color="gray" text="Secondary" />
            <Button color="red" text="Primary" />
          </Flex>
        }
      >
        <Text>Content</Text>
      </SheetMobile>
    </ColorSchemeProvider>
  );
}
