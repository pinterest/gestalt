// @flow strict
import { type Node, useState } from 'react';
import {
  Flex,
  Layer,
  SheetMobile,
  Box,
  DeviceTypeProvider,
  Button,
  FixedZIndex,
  CompositeZIndex,
  GlobalEventsHandlerProvider,
} from 'gestalt';

export default function Example(): Node {
  const [showComponent, setShowComponent] = useState<null | boolean>(true);

  const PAGE_HEADER_ZINDEX: FixedZIndex = new FixedZIndex(10);
  const ABOVE_PAGE_HEADER_ZINDEX: CompositeZIndex = new CompositeZIndex([PAGE_HEADER_ZINDEX]);

  return (
    <GlobalEventsHandlerProvider
      sheetMobile={{
        // eslint-disable-next-line no-console
        onOpen: () => console.log(`on open handler`),
        // eslint-disable-next-line no-console
        onClose: () => console.log(`on close handler`),
      }}
    >
      <DeviceTypeProvider deviceType="mobile">
        {showComponent ? (
          <Layer zIndex={ABOVE_PAGE_HEADER_ZINDEX}>
            <SheetMobile heading="Heading" onDismiss={() => setShowComponent(false)} size="auto">
              <SheetMobile.DismissingElement>
                {({ onDismissStart }) => (
                  <Flex justifyContent="center" alignItems="center" height="100%">
                    <Button color="gray" text="Close" onClick={onDismissStart} />
                  </Flex>
                )}
              </SheetMobile.DismissingElement>
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
    </GlobalEventsHandlerProvider>
  );
}
