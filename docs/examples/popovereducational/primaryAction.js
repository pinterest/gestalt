// @flow strict
import { type Node, useRef, useEffect, useState } from 'react';
import { TapArea, Box, Flex, Text, Mask, Image, PopoverEducational } from 'gestalt';

export default function Example(): Node {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<null | HTMLAnchorElement | HTMLDivElement>(null);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Flex alignItems="center" justifyContent="center" height="100%" width="100%">
      <TapArea ref={anchorRef} rounding={3} fullWidth={false}>
        <Box padding={3} color="secondary" height={75} width={200} rounding={3}>
          <Flex gap={2}>
            <Box aria-hidden width={50}>
              <Mask rounding={3} wash>
                <Image
                  alt="Image of a Spanish paella from above. Yellow rice with red peppers and shrimp on top."
                  color="rgb(231, 186, 176)"
                  loading="lazy"
                  naturalHeight={1}
                  naturalWidth={1}
                  src="https://i.ibb.co/d2tpDss/IMG-0494.jpg"
                />
              </Mask>
            </Box>
            <Flex direction="column">
              <Text size="100">More ideas for</Text>
              <Text weight="bold">Food, Drinks, Snacks</Text>
            </Flex>
          </Flex>
        </Box>
      </TapArea>
      {open && (
        <PopoverEducational
          accessibilityLabel={`Description of new "More ideas" feature`}
          id="popover-primary-action"
          idealDirection="down"
          anchor={anchorRef.current}
          onDismiss={() => {}}
          message="Tap to tag a product or press and hold to see product details"
          primaryAction={{ text: 'Next' }}
        />
      )}
    </Flex>
  );
}
