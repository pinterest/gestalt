// @flow strict
import { type Node, useEffect, useRef, useState } from 'react';
import { Box, Button, Flex, Layer, Popover, ScrollBoundaryContainer, Tabs, Text } from 'gestalt';

export default function SemiTransparentWhiteButtonExample(): Node {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<null | HTMLElement>(null);
  const viewRef = useRef<null | HTMLElement>(null);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <ScrollBoundaryContainer>
      <Box ref={viewRef}>
        <Box display="flex" justifyContent="center" ref={anchorRef}>
          <Tabs
            activeTabIndex={0}
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
                <Text color="light" align="center">
                  New look! Click Created to see Pins you`ve published. Click Saved to see your
                  saved Pins and boards.
                </Text>
                <Flex alignItems="stretch" direction="column" gap={{ column: 2, row: 0 }}>
                  <Button color="white" size="lg" text="Got it" fullWidth />
                  <Button color="semiTransparentWhite" size="lg" text="Learn more" fullWidth />
                </Flex>
              </Flex>
            </Box>
          </Popover>
        </Layer>
      )}
    </ScrollBoundaryContainer>
  );
}
