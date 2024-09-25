import { Fragment, useRef, useState } from 'react';
import { Box, Flex, Popover, SearchGuideLink } from 'gestalt';

export default function Example() {
  const [showOutfits, setShowOutfits] = useState(false);
  const anchorRef = useRef<HTMLElement | null>(null);

  return (
    <Fragment>
      <Flex alignContent="stretch" alignItems="center" gap={2} justifyContent="center" width="100%">
        <SearchGuideLink color="01" href="http://pinterest.com" text="Designs" />
        <SearchGuideLink
          // @ts-expect-error - TS2322 - Type 'MutableRefObject<HTMLElement | null>' is not assignable to type 'LegacyRef<HTMLButtonElement> | undefined'.
          ref={anchorRef}
          color="02"
          expandable
          href="http://pinterest.com"
          onClick={() => setShowOutfits((showing) => !showing)}
          text="Outfits"
        />
        <SearchGuideLink color="03" href="http://pinterest.com" text="Vintage" />
      </Flex>
      {showOutfits && (
        <Popover
          anchor={anchorRef.current}
          idealDirection="down"
          onDismiss={() => setShowOutfits(false)}
        >
          <Box height={120}>
            <Flex direction="row" gap={2} wrap>
              <SearchGuideLink color="02" href="http://pinterest.com" text="Casual" />
              <SearchGuideLink color="02" href="http://pinterest.com" text="Formal" />
              <SearchGuideLink color="02" href="http://pinterest.com" text="Athletic" />
            </Flex>
          </Box>
        </Popover>
      )}
    </Fragment>
  );
}
