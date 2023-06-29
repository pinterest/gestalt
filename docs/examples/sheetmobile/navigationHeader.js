// @flow strict
import { Fragment, type Node, useState } from 'react';
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

export default function Example(): Node {
  const [showComponent, setShowComponent] = useState(true);
  const [page, setPage] = useState(1);

  const PAGE_HEADER_ZINDEX: FixedZIndex = new FixedZIndex(10);
  const ABOVE_PAGE_HEADER_ZINDEX: CompositeZIndex = new CompositeZIndex([PAGE_HEADER_ZINDEX]);

  return (
    <DeviceTypeProvider deviceType="mobile">
      {showComponent ? (
        <Layer zIndex={ABOVE_PAGE_HEADER_ZINDEX}>
          <SheetMobile
            backIconButton={
              page > 1
                ? {
                    accessibilityLabel: 'Previous page',
                    onClick: () => setPage((value) => value - 1),
                  }
                : undefined
            }
            forwardIconButton={
              page < 3
                ? {
                    accessibilityLabel: 'Next page',
                    onClick: () => setPage((value) => value + 1),
                  }
                : undefined
            }
            heading="Business guidelines"
            subHeading="Create Pins in no time with our flexible tools."
            onDismiss={() => setShowComponent(false)}
          >
            <Fragment>
              {page === 1 ? (
                <Text>
                  Upload images or videos. Create and edit Pins right from our app or desktop site.
                  You can make one Pin at a time, or upload assets in bulk.
                </Text>
              ) : null}
              {page === 2 ? (
                <Text>
                  Add your product feed. Connect a product feed and we’ll turn every product into
                  its own Pin.
                </Text>
              ) : null}
              {page === 3 ? (
                <Text>
                  Publish from your site. Link your site’s RSS feed and we’ll automatically create
                  Pins for new images in the feed.
                </Text>
              ) : null}
            </Fragment>
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
