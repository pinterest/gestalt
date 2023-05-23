// @flow strict
import { type Node, useRef, useEffect, useState } from 'react';
import { Box, Flex, IconButton, Text, PopoverEducational } from 'gestalt';

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
    <Flex alignItems="center" justifyContent="between" height="100%" width="100%">
      <Box>
        <IconButton
          accessibilityLabel="This IconButton represents a new feature"
          iconColor="darkGray"
          icon="pin"
          onClick={() => {}}
          ref={anchorRefA}
          size="lg"
        />
        {openA && (
          <PopoverEducational
            accessibilityLabel="Simple message string"
            anchor={anchorRefA.current}
            idealDirection="right"
            onDismiss={() => {}}
            message="Simple message string"
          />
        )}
      </Box>
      <Box>
        <IconButton
          accessibilityLabel="This IconButton represents a new feature"
          iconColor="darkGray"
          icon="pin"
          onClick={() => {}}
          ref={anchorRefB}
          size="lg"
        />
        {openB && (
          <PopoverEducational
            accessibilityLabel="Rich message with Text component and bold text"
            anchor={anchorRefB.current}
            idealDirection="right"
            onDismiss={() => {}}
            message={
              <Text inline>
                Rich message with Text component and{' '}
                <Text inline weight="bold">
                  bold text
                </Text>
              </Text>
            }
          />
        )}
      </Box>
    </Flex>
  );
}
