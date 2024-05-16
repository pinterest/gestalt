import { ReactNode, useState } from 'react';
import {
  Box,
  Button,
  CompositeZIndex,
  DefaultLabelProvider,
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
    <DefaultLabelProvider
      labels={{
        SheetMobile: {
          accessibilityDismissButtonLabel: 'Das untere Blatt ist zu verwerfen',
          accessibilityGrabberLabel: 'Greifer',
          accessibilityLabel: 'Unteres Blatt.',
        },
      }}
    >
      <DeviceTypeProvider deviceType="mobile">
        {showComponent ? (
          <Layer zIndex={ABOVE_PAGE_HEADER_ZINDEX}>
            <SheetMobile
              heading="Beginnen Sie jetzt mit der Erstellung."
              onDismiss={() => setShowComponent(false)}
              showDismissButton
              subHeading="Die Inspiration beginnt hier."
            >
              <Text>Inhalt</Text>
            </SheetMobile>
          </Layer>
        ) : null}
        <Box padding={2}>
          <Button
            accessibilityLabel="Auf Pinterest erstellen."
            color="red"
            onClick={() => setShowComponent(true)}
            size="lg"
            text="Erstellen."
          />
        </Box>
      </DeviceTypeProvider>
    </DefaultLabelProvider>
  );
}
