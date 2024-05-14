import { useState } from 'react';
import {
  Box,
  Button,
  CompositeZIndex,
  DeviceTypeProvider,
  FixedZIndex,
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
          <SheetMobile heading="Heading" onDismiss={() => setShowComponent(false)}>
            <Text>Content</Text>
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
