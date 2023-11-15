// @flow strict
import { type Node as ReactNode } from 'react';
import { Button, ColorSchemeProvider, DeviceTypeProvider, Flex, SheetMobile, Text } from 'gestalt';

export default function Snapshot(): ReactNode {
  return (
    <ColorSchemeProvider colorScheme="light">
      <DeviceTypeProvider deviceType="mobile">
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
      </DeviceTypeProvider>
    </ColorSchemeProvider>
  );
}
