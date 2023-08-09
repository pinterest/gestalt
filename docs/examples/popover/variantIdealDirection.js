// @flow strict
import { type Node, useEffect, useRef, useState } from 'react';
import { Box, ButtonLink, Flex, Layer, Popover, ScrollBoundaryContainer, Text } from 'gestalt';

export default function Example(): Node {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<null | HTMLElement>(null);
  const viewRef = useRef<null | HTMLElement>(null);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Flex alignItems="center" justifyContent="center" height="100%" width="100%">
      <ScrollBoundaryContainer>
        <Box
          color="default"
          display="flex"
          alignItems="center"
          ref={viewRef}
          padding={4}
          width={600}
          height={200}
        >
          <Flex gap={{ column: 0, row: 2 }}>
            <Box width={300}>
              <Text>
                You need to add your data source URL to Pinterest so we can access your data source
                file and create Pins for your products. Before you do this, make sure you have
                prepared your data source and that you have claimed your website.
              </Text>
            </Box>
            <ButtonLink
              ref={anchorRef}
              href="#"
              iconEnd="visit"
              onClick={() => setOpen(false)}
              size="lg"
              target="blank"
              text="Help"
            />
          </Flex>
        </Box>
        {open && (
          <Layer>
            <Popover
              anchor={anchorRef.current}
              idealDirection="down"
              onDismiss={() => {}}
              positionRelativeToAnchor
              size={240}
            >
              <Box
                height={100}
                width={300}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Text align="center">Content</Text>
              </Box>
            </Popover>
          </Layer>
        )}
      </ScrollBoundaryContainer>
    </Flex>
  );
}
