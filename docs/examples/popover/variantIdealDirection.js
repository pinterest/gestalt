// @flow strict
import { type Node as ReactNode, useEffect, useRef, useState } from 'react';
import { Box, ButtonLink, Flex, Layer, Popover, ScrollBoundaryContainer, Text } from 'gestalt';

export default function Example(): ReactNode {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<null | HTMLElement>(null);
  const viewRef = useRef<null | HTMLElement>(null);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <ScrollBoundaryContainer>
        <Box
          ref={viewRef}
          alignItems="center"
          color="default"
          display="flex"
          height={200}
          padding={4}
          width={600}
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
                alignItems="center"
                display="flex"
                height={100}
                justifyContent="center"
                width={300}
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
