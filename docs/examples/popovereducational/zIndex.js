// @flow strict
import { type Node as ReactNode, useEffect, useRef, useState } from 'react';
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

export default function Example(): ReactNode {
  const [open, setOpen] = useState(false);
  const [hasZindex, setHasZindex] = useState(false);

  const anchorRef = useRef<HTMLDivElement | HTMLAnchorElement | null>(null);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Flex
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
      direction="column"
      gap={12}
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
            zIndex={hasZindex ? new FixedZIndex(50) : undefined}
            accessibilityLabel={`Description of new "More ideas" feature`}
            id="popover-primary-action"
            idealDirection="right"
            anchor={anchorRef.current}
            onDismiss={() => {}}
            message="Tap to tag a product or press and hold to see product details"
            primaryAction={{ text: 'Next', role: 'button' }}
          />
        )}
        <Box
          padding={3}
          color="secondary"
          height={75}
          width={200}
          rounding={3}
          zIndex={new FixedZIndex(1)}
          position="relative"
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
