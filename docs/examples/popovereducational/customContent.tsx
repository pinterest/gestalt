import { ReactNode, useEffect, useRef, useState } from 'react';
import { Box, Button, Flex, IconButton, PopoverEducational, Text } from 'gestalt';

export default function Example() {
  const [open, setOpen] = useState(false);
  const anchorRefA = useRef<null | HTMLButtonElement | HTMLAnchorElement>(null);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <IconButton
        // @ts-expect-error - TS2322 - Type 'MutableRefObject<HTMLAnchorElement | HTMLButtonElement | null>' is not assignable to type 'LegacyRef<HTMLButtonElement> | undefined'.
        ref={anchorRefA}
        accessibilityLabel="This IconButton represents a new feature"
        icon="pin"
        iconColor="darkGray"
        onClick={() => {}}
        size="lg"
      />
      {open && (
        <PopoverEducational
          accessibilityLabel={`Description of new "More ideas" feature`}
          anchor={anchorRefA.current}
          idealDirection="down"
          onDismiss={() => {}}
        >
          <Box padding={3}>
            <Flex direction="column" gap={3}>
              <Text color="light">
                Tap to tag a product or press and hold to see product details
              </Text>
              <Flex.Item alignSelf="end">
                <Button color="white" text="Next" />
              </Flex.Item>
            </Flex>
          </Box>
        </PopoverEducational>
      )}
    </Flex>
  );
}
