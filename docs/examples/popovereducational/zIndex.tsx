import { ReactNode, useEffect, useRef, useState } from 'react';
import {
  Box,
  FixedZIndex,
  Flex,
  Image,
  Label,
  Mask,
  PopoverEducational,
  Switch,
  TapArea,
  Text,
} from 'gestalt';

export default function Example() {
  const [open, setOpen] = useState(false);
  const [hasZindex, setHasZindex] = useState(false);

  const anchorRef = useRef<HTMLDivElement | HTMLAnchorElement | null>(null);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Flex
      alignItems="center"
      direction="column"
      gap={12}
      height="100%"
      justifyContent="center"
      width="100%"
    >
      <Flex alignItems="center" gap={2}>
        <Label htmlFor="introExample">
          <Text>Apply new FixedZIndex(2)</Text>
        </Label>

        <Switch
          id="introExample"
          onChange={() => setHasZindex((currVal) => !currVal)}
          switched={hasZindex}
        />
      </Flex>
      <Flex gap={2}>
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
          <PopoverEducational
            accessibilityLabel={`Description of new "More ideas" feature`}
            anchor={anchorRef.current}
            id="popover-primary-action"
            idealDirection="right"
            message="Tap to tag a product or press and hold to see product details"
            onDismiss={() => {}}
            primaryAction={{ text: 'Next', role: 'button' }}
            zIndex={hasZindex ? new FixedZIndex(50) : undefined}
          />
        )}
        <Box
          color="secondary"
          height={75}
          padding={3}
          position="relative"
          rounding={3}
          width={200}
          zIndex={new FixedZIndex(1)}
        >
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
              <Text weight="bold">Halloween customs</Text>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}
