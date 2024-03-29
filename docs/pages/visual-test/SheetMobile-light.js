// @flow strict
import { type Node as ReactNode } from 'react';
import { Button, ColorSchemeProvider, DeviceTypeProvider, Flex, SheetMobile, Text } from 'gestalt';

export default function Snapshot(): ReactNode {
  return (
    <ColorSchemeProvider colorScheme="light">
      <DeviceTypeProvider deviceType="mobile">
        <SheetMobile
          footer={
            <Flex gap={2} justifyContent="center">
              <Button color="gray" text="Secondary" />
              <Button color="red" text="Primary" />
            </Flex>
          }
          heading="Heading"
          onDismiss={() => {}}
          primaryAction={{ accessibilityLabel: 'Next page', label: 'Next', onClick: () => {} }}
          subHeading="SubHeading"
        >
          <Text>Content</Text>
        </SheetMobile>
      </DeviceTypeProvider>
    </ColorSchemeProvider>
  );
}
