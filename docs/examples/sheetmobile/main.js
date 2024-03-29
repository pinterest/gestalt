// @flow strict
import { type Node as ReactNode, useState } from 'react';
import {
  Box,
  Button,
  CompositeZIndex,
  DeviceTypeProvider,
  FixedZIndex,
  Flex,
  Layer,
  SheetMobile,
  Text,
} from 'gestalt';

export default function Example(): ReactNode {
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
                    <Button color="gray" onClick={() => onDismissStart()} text="Secondary" />
                    <Button color="red" onClick={() => onDismissStart()} text="Primary" />
                  </Flex>
                )}
              </SheetMobile.DismissingElement>
            }
            heading="Heading"
            onDismiss={() => setShowComponent(false)}
            primaryAction={{
              accessibilityLabel: 'Next page',
              label: 'Next',
              onClick: ({ onDismissStart }) => onDismissStart(),
            }}
            size="auto"
            subHeading="SubHeading"
          >
            <Box>
              {Array(100).map((number, index) => {
                const key = `example${index}`;
                return <Text key={key}>Content</Text>;
              })}
            </Box>
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
