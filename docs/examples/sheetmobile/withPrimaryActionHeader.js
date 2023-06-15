// @flow strict
import { type Node, useState } from 'react';
import {
  Box,
  Button,
  CompositeZIndex,
  DeviceTypeProvider,
  FixedZIndex,
  Flex,
  IconButton,
  Layer,
  SheetMobile,
  TextField,
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
            footer={
              <Flex justifyContent="between" gap={2}>
                <IconButton
                  accessibilityLabel="This IconButton is an example of IconButton acting as a link"
                  icon="share"
                  role="link"
                  target="blank"
                  href="https://www.pinterest.com"
                  tooltip={{ text: 'Link example' }}
                />
                <Flex gap={2}>
                  <Button color="gray" text="Secondary" />
                </Flex>
                <IconButton
                  accessibilityLabel="This IconButton is an example of IconButton acting as a link"
                  icon="ellipsis"
                  role="link"
                  target="blank"
                  href="https://www.pinterest.com"
                  tooltip={{ text: 'Link example' }}
                />
              </Flex>
            }
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
