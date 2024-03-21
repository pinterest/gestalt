// @flow strict
import { type Node as ReactNode, useCallback, useMemo, useState } from 'react';
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

export default function Example(): ReactNode {
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
                  <Flex alignItems="center" height="100%" justifyContent="center">
                    <Button color="gray" onClick={onDismissStart} text="Close" />
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
            onClick={() => setShowComponent(true)}
            size="lg"
            text="Show SheetMobile"
          />
        </Box>
      </DeviceTypeProvider>
    </GlobalEventsHandlerProvider>
  );
}
