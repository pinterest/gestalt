// @flow strict
import { type Node, useRef, useEffect, useState } from 'react';
import { Box, Flex, IconButton, Button, Text, PopoverEducational } from 'gestalt';

export default function Example(): Node {
  const [open, setOpen] = useState(false);
  const anchorRefA = useRef<null | HTMLButtonElement | HTMLAnchorElement>(null);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Flex alignItems="center" justifyContent="center" height="100%" width="100%">
      <IconButton
        accessibilityLabel="This IconButton represents a new feature"
        iconColor="darkGray"
        icon="pin"
        onClick={() => {}}
        ref={anchorRefA}
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
