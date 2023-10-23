// @flow strict
import { type Node, useState } from 'react';
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

export default function Example(): Node {
  const [showComponent, setShowComponent] = useState(true);
  const PAGE_HEADER_ZINDEX: FixedZIndex = new FixedZIndex(10);
  const ABOVE_PAGE_HEADER_ZINDEX: CompositeZIndex = new CompositeZIndex([PAGE_HEADER_ZINDEX]);

  return (
    <DefaultLabelProvider
      // $FlowExpectedError[incompatible-type] For demostration purposes
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
              subHeading="Die Inspiration beginnt hier."
              onDismiss={() => setShowComponent(false)}
              showDismissButton
            >
              <Text>Inhalt</Text>
            </SheetMobile>
          </Layer>
        ) : null}
        <Box padding={2}>
          <Button
            accessibilityLabel="Auf Pinterest erstellen."
            color="red"
            text="Erstellen."
            size="lg"
            onClick={() => setShowComponent(true)}
          />
        </Box>
      </DeviceTypeProvider>
    </DefaultLabelProvider>
  );
}
