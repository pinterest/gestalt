// @flow strict
import { type Node, useState } from 'react';
import {
  Layer,
  SheetMobile,
  Box,
  TextField,
  DeviceTypeProvider,
  Button,
  FixedZIndex,
  CompositeZIndex,
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
            heading="Create a new personal account"
            onDismiss={() => setShowComponent(false)}
            showDismissButton={false}
            primaryAction={{ accessibilityLabel: 'Next page', label: 'Next', onClick: () => {} }}
          >
            <TextField
              autoComplete="username"
              id="header-example"
              label="Username"
              onChange={() => {}}
              placeholder="Please enter your username"
              type="text"
            />
          </SheetMobile>
        </Layer>
      ) : null}
      <Box padding={2}>
        <Button
          color="red"
          text="Show SheetMobile"
          size="lg"
          onClick={() => setShowComponent(true)}
        />
      </Box>
    </DeviceTypeProvider>
  );
}
