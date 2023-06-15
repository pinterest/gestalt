// @flow strict
import { type Node, useState } from 'react';
import {
  Box,
  Button,
  CompositeZIndex,
  DeviceTypeProvider,
  FixedZIndex,
  Flex,
  Layer,
  SheetMobile,
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
            heading="Heading"
            forwardIconButton={{
              accessibilityLabel: 'Next page',
              onClick: ({ onDismissStart }) => onDismissStart(),
            }}
            onDismiss={() => setShowComponent(false)}
            footer={
              <SheetMobile.DismissingElement>
                {({ onDismissStart }) => (
                  <Flex justifyContent="center" gap={2}>
                    <Button color="red" text="Close" onClick={onDismissStart} />
                  </Flex>
                )}
              </SheetMobile.DismissingElement>
            }
            size="auto"
          >
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
  );
}
