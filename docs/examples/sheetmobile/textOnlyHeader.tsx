import { useState } from 'react';
import {
  Box,
  Button,
  CompositeZIndex,
  DeviceTypeProvider,
  FixedZIndex,
  Flex,
  Icon,
  Layer,
  SheetMobile,
  Text,
} from 'gestalt';

export default function Example() {
  const [showComponent, setShowComponent] = useState(true);
  const PAGE_HEADER_ZINDEX: FixedZIndex = new FixedZIndex(10);
  const ABOVE_PAGE_HEADER_ZINDEX: CompositeZIndex = new CompositeZIndex([PAGE_HEADER_ZINDEX]);

  return (
    <DeviceTypeProvider deviceType="mobile">
      {showComponent ? (
        <Layer zIndex={ABOVE_PAGE_HEADER_ZINDEX}>
          <SheetMobile
            align="center"
            heading="Start creating now"
            onDismiss={() => setShowComponent(false)}
            showDismissButton={false}
            size="auto"
            subHeading="Inspiration starts here"
          >
            <Flex alignItems="center" gap={12} height="100%" justifyContent="center">
              <Flex alignItems="center" direction="column" gap={1}>
                <Box
                  alignItems="center"
                  color="secondary"
                  display="flex"
                  height={50}
                  justifyContent="center"
                  rounding={4}
                  width={50}
                >
                  <Icon accessibilityLabel="Pin" color="default" icon="pin" />
                </Box>
                <Text size="100" weight="bold">
                  Pin
                </Text>
              </Flex>
              <Flex alignItems="center" direction="column" gap={1}>
                <Box
                  alignItems="center"
                  color="secondary"
                  display="flex"
                  height={50}
                  justifyContent="center"
                  rounding={4}
                  width={50}
                >
                  <Icon accessibilityLabel="Pin" color="default" icon="board" />
                </Box>
                <Text size="100" weight="bold">
                  Board
                </Text>
              </Flex>
            </Flex>
          </SheetMobile>
        </Layer>
      ) : null}
      <Box padding={2}>
        <Button
          accessibilityLabel="Show SheetMobile"
          color="red"
          onClick={() => setShowComponent(true)}
          size="lg"
          text="Show SheetMobile"
        />
      </Box>
    </DeviceTypeProvider>
  );
}
