import { useEffect, useRef, useState } from 'react';
import { Box, Flex, Image, Mask, PopoveMessage, TapArea, Text } from 'gestalt';

export default function Example() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<null | HTMLAnchorElement | HTMLDivElement>(null);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      {/* @ts-expect-error - TS2322 - Type 'MutableRefObject<HTMLDivElement | HTMLAnchorElement | null>' is not assignable to type 'LegacyRef<HTMLButtonElement> | undefined'. */}
      <TapArea ref={anchorRef} fullWidth={false} rounding={3}>
        <Box color="secondary" height={75} padding={3} rounding={3} width={200}>
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
        <PopoveMessage
          accessibilityLabel={`Description of new "More ideas" feature`}
          anchor={anchorRef.current}
          id="popover-primary-action"
          idealDirection="down"
          message="Tap to tag a product or press and hold to see product details"
          onDismiss={() => {}}
          primaryAction={{ text: 'Next', role: 'button' }}
        />
      )}
    </Flex>
  );
}
