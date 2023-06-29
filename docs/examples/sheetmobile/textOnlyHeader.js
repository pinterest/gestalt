// @flow strict
import { type Node, useState } from 'react';
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

export default function Example(): Node {
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
            subHeading="Inspiration starts here"
            onDismiss={() => setShowComponent(false)}
            showDismissButton={false}
            size="auto"
          >
            <Flex gap={12} height="100%" alignItems="center" justifyContent="center">
              <Flex gap={1} direction="column" alignItems="center">
                <Box
                  color="secondary"
                  rounding={4}
                  height={50}
                  width={50}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Icon icon="pin" accessibilityLabel="Pin" color="default" />
                </Box>
                <Text weight="bold" size="100">
                  Pin
                </Text>
              </Flex>
              <Flex gap={1} direction="column" alignItems="center">
                <Box
                  color="secondary"
                  rounding={4}
                  height={50}
                  width={50}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Icon icon="board" accessibilityLabel="Pin" color="default" />
                </Box>
                <Text weight="bold" size="100">
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
          text="Show SheetMobile"
          size="lg"
          onClick={() => setShowComponent(true)}
        />
      </Box>
    </DeviceTypeProvider>
  );
}
