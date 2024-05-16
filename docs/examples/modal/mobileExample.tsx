import {ReactNode, useState} from 'react';
import {
  Box,
  Button,
  CompositeZIndex,
  DeviceTypeProvider,
  FixedZIndex,
  Flex,
  Layer,
  Modal,
  Text,
} from 'gestalt';

export default function Example() {
  const [showComponent, setShowComponent] = useState(true);
  const HEADER_ZINDEX = new FixedZIndex(10);

  return (
    <DeviceTypeProvider deviceType="mobile">
      {showComponent ? (
        <Layer zIndex={new CompositeZIndex([HEADER_ZINDEX])}>
          <Modal
            accessibilityModalLabel="Mobile Modal example"
            align="center"
            footer={
              <Flex gap={2} justifyContent="center">
                <Button color="gray" text="Secondary" />
                <Button color="red" text="Primary" />
              </Flex>
            }
            heading="Heading"
            onDismiss={() => setShowComponent(false)}
            size="lg"
            subHeading="SubHeading"
          >
            <Box>{Array(100).fill(<Text>Content</Text>)}</Box>
          </Modal>
        </Layer>
      ) : null}
      <Box padding={2}>
        <Button
          accessibilityLabel="Show Modal"
          color="red"
          onClick={() => setShowComponent(true)}
          size="lg"
          text="Show Modal"
        />
      </Box>
    </DeviceTypeProvider>
  );
}
