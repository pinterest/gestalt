// @flow strict
import { type Node as ReactNode, useState } from 'react';
import {
  Box,
  Button,
  CompositeZIndex,
  DeviceTypeProvider,
  FixedZIndex,
  Flex,
  IconButtonLink,
  Layer,
  SheetMobile,
  TextField,
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
            align="center"
            footer={
              <Flex gap={2} justifyContent="between">
                <IconButtonLink
                  accessibilityLabel="This IconButton is an example of IconButton acting as a link"
                  href="https://www.pinterest.com"
                  icon="share"
                  target="blank"
                  tooltip={{ text: 'Link example' }}
                />
                <Flex gap={2}>
                  <Button color="gray" text="Secondary" />
                </Flex>
                <IconButtonLink
                  accessibilityLabel="This IconButton is an example of IconButton acting as a link"
                  href="https://www.pinterest.com"
                  icon="ellipsis"
                  target="blank"
                  tooltip={{ text: 'Link example' }}
                />
              </Flex>
            }
            heading="Create a new personal account"
            onDismiss={() => setShowComponent(false)}
            primaryAction={{ accessibilityLabel: 'Next page', label: 'Next', onClick: () => {} }}
            showDismissButton={false}
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
          onClick={() => setShowComponent(true)}
          size="lg"
          text="Show SheetMobile"
        />
      </Box>
    </DeviceTypeProvider>
  );
}
