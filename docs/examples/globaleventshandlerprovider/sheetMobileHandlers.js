// @flow strict
import { type Node, useCallback, useMemo, useState } from 'react';
import {
  Box,
  Button,
  CompositeZIndex,
  DeviceTypeProvider,
  FixedZIndex,
  Flex,
  GlobalEventsHandlerProvider,
  Layer,
  SheetMobile,
} from 'gestalt';

export default function Example(): Node {
  const [showComponent, setShowComponent] = useState<null | boolean>(true);

  const PAGE_HEADER_ZINDEX: FixedZIndex = new FixedZIndex(10);
  const ABOVE_PAGE_HEADER_ZINDEX: CompositeZIndex = new CompositeZIndex([PAGE_HEADER_ZINDEX]);

  // eslint-disable-next-line no-console
  const sheetMobileOnOpen = useCallback(() => console.log('On open handler'), []);
  // eslint-disable-next-line no-console
  const sheetMobileOnClose = useCallback(() => console.log('On close handler'), []);
  const sheetMobileHandlers = useMemo(
    () => ({ onOpen: sheetMobileOnOpen, onClose: sheetMobileOnClose }),
    [sheetMobileOnOpen, sheetMobileOnClose],
  );

  return (
    <GlobalEventsHandlerProvider sheetMobileHandlers={sheetMobileHandlers}>
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
