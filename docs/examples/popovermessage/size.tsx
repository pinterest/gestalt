import { useEffect, useRef, useState } from 'react';
import { Box, Flex, IconButton, PopoveMessage } from 'gestalt';

export default function Example() {
  const [openA, setOpenA] = useState(false);
  const [openB, setOpenB] = useState(false);
  const anchorRefA = useRef<null | HTMLAnchorElement | HTMLButtonElement>(null);
  const anchorRefB = useRef<null | HTMLAnchorElement | HTMLButtonElement>(null);

  useEffect(() => {
    setOpenA(true);
    setOpenB(true);
  }, []);

  return (
    <Box height="100%" padding={4} width="100%">
      <Flex direction="column" height="100%" justifyContent="between" width="100%">
        <Box>
          <IconButton
            // @ts-expect-error - TS2322 - Type 'MutableRefObject<HTMLAnchorElement | HTMLButtonElement | null>' is not assignable to type 'LegacyRef<HTMLButtonElement> | undefined'.
            ref={anchorRefA}
            accessibilityLabel="This IconButton represents a new feature"
            icon="pin"
            iconColor="darkGray"
            onClick={() => {}}
            size="lg"
          />
        </Box>
        {openA && (
          <PopoveMessage
            accessibilityLabel="Description of new feature"
            anchor={anchorRefA.current}
            idealDirection="right"
            message="Ads allow you to reach more people who matter to you. When audiences engage with your ad, you'll be able to track performance here."
            onDismiss={() => {}}
            size="flexible"
          />
        )}
        <Box>
          <IconButton
            // @ts-expect-error - TS2322 - Type 'MutableRefObject<HTMLAnchorElement | HTMLButtonElement | null>' is not assignable to type 'LegacyRef<HTMLButtonElement> | undefined'.
            ref={anchorRefB}
            accessibilityLabel="This IconButton represents a new feature"
            icon="pin"
            iconColor="darkGray"
            onClick={() => {}}
            size="lg"
          />
        </Box>
        {openB && (
          <PopoveMessage
            accessibilityLabel="Description of new feature"
            anchor={anchorRefB.current}
            idealDirection="right"
            message="Ads allow you to reach more people who matter to you. When audiences engage with your ad, you'll be able to track performance here."
            onDismiss={() => {}}
          />
        )}
      </Flex>
    </Box>
  );
}
