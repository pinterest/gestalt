import {ReactNode, useState} from 'react';
import { Box, Button, DeviceTypeProvider, Layer, ModalAlert, Text } from 'gestalt';

export default function Example() {
  const [showComponent, setShowComponent] = useState(true);

  return (
    <DeviceTypeProvider deviceType="mobile">
      <Box padding={2}>
        <Button
          accessibilityLabel="Show Modal"
          color="red"
          onClick={() => setShowComponent(true)}
          size="lg"
          text="Show Modal"
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
              role: 'button',
            }}
            secondaryAction={{
              accessibilityLabel: 'Cancel board deletion',
              label: 'No, keep',
              onClick: () => {},
              role: 'button',
            }}
          >
            <Box>{Array(100).fill(<Text>Content</Text>)}</Box>
          </ModalAlert>
        </Layer>
      ) : null}
    </DeviceTypeProvider>
  );
}
