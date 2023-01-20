// @flow strict
import React, { type Node } from 'react';
import { Layer, ModalAlert, Box, Text, DeviceTypeProvider, Button } from 'gestalt';

export default function Example(): Node {
  const [showModal, setShowModal] = React.useState(false);

  return showModal ? (
    <DeviceTypeProvider deviceType="mobile">
      <Layer>
        <ModalAlert
          accessibilityModalLabel="Mobile ModalAlert example"
          heading="Heading"
          onDismiss={() => setShowModal(false)}
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
    </DeviceTypeProvider>
  ) : (
    <Box padding={2}>
      <Button
        accessibilityLabel="Show Modal"
        color="red"
        text="Show Modal"
        size="lg"
        onClick={() => setShowModal(true)}
      />
    </Box>
  );
}
