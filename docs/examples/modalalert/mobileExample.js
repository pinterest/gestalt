// @flow strict
import { type Node, useState } from 'react';
import { Box, Button, DeviceTypeProvider, Layer, ModalAlert, Text } from 'gestalt';

export default function Example(): Node {
  const [showComponent, setShowComponent] = useState(true);

  return (
    <DeviceTypeProvider deviceType="mobile">
      <Box padding={2}>
        <Button
          accessibilityLabel="Show Modal"
          color="red"
          text="Show Modal"
          size="lg"
          onClick={() => setShowComponent(true)}
        />
      </Box>
      {showComponent ? (
        <Layer>
          <ModalAlert
            accessibilityModalLabel="Mobile ModalAlert example"
            heading="Heading"
            onDismiss={() => setShowComponent(false)}
            primaryAction={{
              accessibilityLabel: 'Confirm delete board',
              label: 'Yes, delete',
              onClick: () => {},
            }}
            secondaryAction={{
              accessibilityLabel: 'Cancel board deletion',
              label: 'No, keep',
              onClick: () => {},
            }}
          >
            <Box>{Array(100).fill(<Text>Content</Text>)}</Box>
          </ModalAlert>
        </Layer>
      ) : null}
    </DeviceTypeProvider>
  );
}
