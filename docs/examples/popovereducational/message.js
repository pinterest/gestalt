// @flow strict
import { type Node as ReactNode, useEffect, useRef, useState } from 'react';
import { Box, Flex, IconButton, PopoverEducational, Text } from 'gestalt';

export default function Example(): ReactNode {
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
          ref={anchorRefA}
          accessibilityLabel="This IconButton represents a new feature"
          icon="pin"
          iconColor="darkGray"
          onClick={() => {}}
          size="lg"
        />
        {openA && (
          <PopoverEducational
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
          ref={anchorRefB}
          accessibilityLabel="This IconButton represents a new feature"
          icon="pin"
          iconColor="darkGray"
          onClick={() => {}}
          size="lg"
        />
        {openB && (
          <PopoverEducational
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
