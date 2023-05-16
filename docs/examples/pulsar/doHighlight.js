// @flow strict
import { type Node, useEffect, useRef, useState } from 'react';
import { Box, Button, Flex, Popover, Pulsar, Text } from 'gestalt';

export default function Example(): Node {
  const [showEducation, setShowEducation] = useState(false);
  const anchorRef = useRef<null | HTMLElement>(null);

  useEffect(() => {
    setShowEducation(true);
  }, []);

  return (
    <Flex justifyContent="center" height="100%" width="100%">
      <Box dangerouslySetInlineStyle={{ __style: { marginTop: 80 } }} position="relative">
        <Button
          onClick={() => {
            setShowEducation(true);
          }}
          text="Set goal"
        />

        <Box ref={anchorRef} position="absolute" top marginTop={-9} marginStart={-3}>
          <Pulsar paused={!showEducation} size={110} />
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
                Choose a goal metric and value that represent success for this campaign
              </Text>

              <Button
                text="Got it"
                onClick={() => {
                  setShowEducation(false);
                }}
              />
            </Flex>
          </Box>
        </Popover>
      )}
    </Flex>
  );
}
