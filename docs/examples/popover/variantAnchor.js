// @flow strict
import { type Node, useEffect, useRef, useState } from 'react';
import { Box, Button, Flex, Layer, Popover, ScrollBoundaryContainer, Tabs, Text } from 'gestalt';

export default function Example(): Node {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef();
  const viewRef = useRef();

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Flex alignItems="center" justifyContent="center" height="100%" width="100%">
      <ScrollBoundaryContainer>
        <Box ref={viewRef} width={300} height={220}>
          <Box display="flex" justifyContent="center" ref={anchorRef}>
            <Tabs
              activeTabIndex={1}
              onChange={() => {}}
              tabs={[{ href: '#Anchor', text: 'Created' }]}
            />
          </Box>
        </Box>
        {open && (
          <Layer>
            <Popover
              anchor={anchorRef.current}
              color="blue"
              idealDirection="down"
              showCaret
              onDismiss={() => {}}
              positionRelativeToAnchor={false}
              size={240}
            >
              <Box padding={3}>
                <Flex alignItems="center" direction="column" gap={{ column: 4, row: 0 }}>
                  <Text color="inverse" align="center">
                    New look! Click Created to see Pins you&apos;ve published. Click Saved to see
                    your saved Pins and boards.
                  </Text>
                  <Button color="white" onClick={() => {}} size="lg" text="Got it!" />
                </Flex>
              </Box>
            </Popover>
          </Layer>
        )}
      </ScrollBoundaryContainer>
    </Flex>
  );
}
