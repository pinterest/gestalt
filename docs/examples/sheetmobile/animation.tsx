import {ReactNode, useState} from 'react';
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

export default function Example() {
  const [showComponent, setShowComponent] = useState(true);
  const PAGE_HEADER_ZINDEX: FixedZIndex = new FixedZIndex(10);
  const ABOVE_PAGE_HEADER_ZINDEX: CompositeZIndex = new CompositeZIndex([PAGE_HEADER_ZINDEX]);

  return (
    <DeviceTypeProvider deviceType="mobile">
      {showComponent ? (
        <Layer zIndex={ABOVE_PAGE_HEADER_ZINDEX}>
          <SheetMobile
            footer={
              <SheetMobile.DismissingElement>
                {({ onDismissStart }) => (
                  <Flex gap={2} justifyContent="center">
                    <Button color="red" onClick={onDismissStart} text="Close" />
                  </Flex>
                )}
              </SheetMobile.DismissingElement>
            }
            forwardIconButton={{
              accessibilityLabel: 'Next page',
              onClick: ({ onDismissStart }) => onDismissStart(),
            }}
            heading="Heading"
            onDismiss={() => setShowComponent(false)}
            size="auto"
          >
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
  );
}
