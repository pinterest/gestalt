import { ReactNode, useState } from 'react';
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
          <SheetMobile
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
                  <Button color="red" text="Primary" />
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
            heading="Heading"
            onDismiss={() => setShowComponent(false)}
            showDismissButton={false}
          >
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
