// @flow strict
import { type Node, useEffect, useRef, useState } from 'react';
import { Box, Button, Flex, IconButton, Popover, Pulsar, Text } from 'gestalt';

export default function Example(): Node {
  const [showEducation, setShowEducation] = useState(false);
  const anchorRef = useRef<null | HTMLElement>(null);

  useEffect(() => {
    setShowEducation(true);
  }, []);

  return (
    <Flex justifyContent="center" height="100%" width="100%">
      <Box dangerouslySetInlineStyle={{ __style: { marginTop: 80 } }} position="relative">
        <IconButton accessibilityLabel="Example icon button" icon="flashlight" />

        <Box ref={anchorRef} position="absolute" top margin={-5}>
          <Pulsar size={88} />
        </Box>
      </Box>

      {showEducation && (
        <Popover
          anchor={anchorRef.current}
          color="blue"
          idealDirection="down"
          showCaret
          onDismiss={() => {}}
          positionRelativeToAnchor={false}
          size="xs"
        >
          <Box paddingX={6} paddingY={2}>
            <Flex alignItems="center" direction="column" gap={3}>
              <Text color="inverse" align="center">
                Want to find more Pins that look like this? Find more ideas with visual search
              </Text>

              <Button text="Dismiss" onClick={() => {}} />
            </Flex>
          </Box>
        </Popover>
      )}
    </Flex>
  );
}
