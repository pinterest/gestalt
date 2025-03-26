import { useEffect, useRef, useState } from 'react';
import { Box, Flex, IconButton, PopoverMessage, Text } from 'gestalt';

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
    <Flex alignItems="center" height="100%" justifyContent="between" width="100%">
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
        {openA && (
          <PopoverMessage
            accessibilityLabel="Simple message string"
            anchor={anchorRefA.current}
            idealDirection="right"
            message="Simple message string"
            onDismiss={() => {}}
          />
        )}
      </Box>
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
        {openB && (
          <PopoverMessage
            accessibilityLabel="Rich message with Text component and bold text"
            anchor={anchorRefB.current}
            idealDirection="right"
            message={
              <Text inline>
                Rich message with Text component and{' '}
                <Text inline weight="bold">
                  bold text
                </Text>
              </Text>
            }
            onDismiss={() => {}}
          />
        )}
      </Box>
    </Flex>
  );
}
