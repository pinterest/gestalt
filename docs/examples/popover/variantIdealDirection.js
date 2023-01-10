// @flow strict
import { type Node, useEffect, useRef, useState } from 'react';
import { Box, Button, Flex, Layer, Popover, ScrollBoundaryContainer, Text } from 'gestalt';

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
            <Button
              ref={anchorRef}
              href="https://help.pinterest.com/en/business/article/data-source-ingestion"
              iconEnd="visit"
              onClick={() => setOpen(false)}
              role="link"
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
              color="blue"
              idealDirection="right"
              onDismiss={() => {}}
              positionRelativeToAnchor={false}
              showCaret
              size="xs"
            >
              <Box padding={3} display="flex" alignItems="center" direction="column">
                <Text color="inverse" align="center">
                  Need help with something? Check out our Help Center.
                </Text>
              </Box>
            </Popover>
          </Layer>
        )}
      </ScrollBoundaryContainer>
    </Flex>
  );
}
