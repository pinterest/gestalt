import { Fragment, useRef, useState } from 'react';
import { Box, Flex, Popover, SearchGuide } from 'gestalt';

export default function Example() {
  const [showOutfits, setShowOutfits] = useState(false);
  const anchorRef = useRef<HTMLElement | null>(null);

  return (
    <Fragment>
      <Flex alignContent="stretch" alignItems="center" gap={2} justifyContent="center" width="100%">
        <SearchGuide
          // @ts-expect-error - TS2322 - Type 'MutableRefObject<HTMLElement | null>' is not assignable to type 'LegacyRef<HTMLButtonElement> | undefined'.
          ref={anchorRef}
          accessibilityControls="popover"
          accessibilityExpanded={showOutfits}
          accessibilityHaspopup
          accessibilityLabel="Outfits"
          color="02"
          expandable
          onClick={() => setShowOutfits((showing) => !showing)}
          selected={showOutfits}
          text="Outfits"
        />
      </Flex>
      {showOutfits && (
        <Popover
          anchor={anchorRef.current}
          id="popover"
          idealDirection="down"
          onDismiss={() => setShowOutfits(false)}
          size="flexible"
        >
          <Box overflow="scrollX" padding={4}>
            <Flex direction="row" gap={2} wrap>
              <SearchGuide color="01" text="Casual" />
              <SearchGuide color="02" text="Formal" />
              <SearchGuide color="03" text="Athletic" />
            </Flex>
          </Box>
        </Popover>
      )}
    </Fragment>
  );
}
