// @flow strict
import { useState, type Node } from 'react';
import { Layer, ModalAlert, Box, Text, DeviceTypeProvider, Button } from 'gestalt';

export default function Example(): Node {
  const [showComponent, setShowComponent] = useState(false);

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
