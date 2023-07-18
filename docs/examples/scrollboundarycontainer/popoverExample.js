// @flow strict
import { type Node, useEffect, useRef, useState } from 'react';
import { Box, Button, Flex, PopoverEducational, ScrollBoundaryContainer, Text } from 'gestalt';

export default function Example(): Node {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<null | HTMLAnchorElement | HTMLButtonElement>(null);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Box padding={4} color="secondary" height="100%">
      <ScrollBoundaryContainer height={200}>
        <Box padding={4} width={600} color="light">
          <Flex gap={{ column: 0, row: 4 }}>
            <Box width={200}>
              <Text>
                You need to add your data source URL to Pinterest so we can access your data source
                file and create Pins for your products. Before you do this, make sure you have
                prepared your data source and that you have claimed your website. If there are any
                errors with your data source file, you can learn how to troubleshoot them below.
                After you click Create Pins, you will land back at the main data source page while
                your feed is being processed. Wait for a confirmation email from Pinterest about the
                status of your data source submission.
              </Text>
            </Box>
            <Button
              ref={anchorRef}
              href="https://help.pinterest.com/en/business/article/data-source-ingestion"
              iconEnd="visit"
              onClick={() => setOpen(false)}
              role="link"
              target="blank"
              text="Help"
            />
            {open && (
              <PopoverEducational
                anchor={anchorRef.current}
                idealDirection="right"
                onDismiss={() => {}}
                message="Need help with something? Check out our Help Center."
              />
            )}
          </Flex>
        </Box>
      </ScrollBoundaryContainer>
    </Box>
  );
}
