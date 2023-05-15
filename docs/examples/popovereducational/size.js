// @flow strict
import { type Node, useRef, useEffect, useState } from 'react';
import { Box, Flex, IconButton, PopoverEducational } from 'gestalt';

export default function Example(): Node {
  const [openA, setOpenA] = useState(false);
  const [openB, setOpenB] = useState(false);
  const anchorRefA = useRef<null | HTMLAnchorElement | HTMLButtonElement>(null);
  const anchorRefB = useRef<null | HTMLAnchorElement | HTMLButtonElement>(null);

  useEffect(() => {
    setOpenA(true);
    setOpenB(true);
  }, []);

  return (
    <Box width="100%" height="100%" padding={4}>
      <Flex direction="column" width="100%" height="100%" justifyContent="between">
        <Box>
          <IconButton
            accessibilityLabel="This IconButton represents a new feature"
            iconColor="darkGray"
            icon="pin"
            onClick={() => {}}
            ref={anchorRefA}
            size="lg"
          />
        </Box>
        {openA && (
          <PopoverEducational
            accessibilityLabel="Description of new feature"
            size="flexible"
            anchor={anchorRefA.current}
            idealDirection="right"
            onDismiss={() => {}}
            message="Ads allow you to reach more people who matter to you. When audiences engage with your ad, you'll be able to track performance here."
          />
        )}
        <Box>
          <IconButton
            accessibilityLabel="This IconButton represents a new feature"
            iconColor="darkGray"
            icon="pin"
            onClick={() => {}}
            ref={anchorRefB}
            size="lg"
          />
        </Box>
        {openB && (
          <PopoverEducational
            accessibilityLabel="Description of new feature"
            anchor={anchorRefB.current}
            idealDirection="right"
            onDismiss={() => {}}
            message="Ads allow you to reach more people who matter to you. When audiences engage with your ad, you'll be able to track performance here."
          />
        )}
      </Flex>
    </Box>
  );
}
