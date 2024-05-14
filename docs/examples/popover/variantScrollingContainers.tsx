import { useEffect, useRef, useState } from 'react';
import { Box, ButtonLink, Flex, Layer, Popover, ScrollBoundaryContainer, Text } from 'gestalt';

export default function Example() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<null | HTMLElement>(null);
  const viewRef = useRef<null | HTMLElement>(null);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Box
      alignItems="center"
      color="lightWash"
      display="flex"
      height="100%"
      justifyContent="center"
      padding={6}
      width="100%"
    >
      <ScrollBoundaryContainer height={200}>
        {/* @ts-expect-error - TS2322 - Type 'MutableRefObject<HTMLElement | null>' is not assignable to type 'LegacyRef<HTMLDivElement> | undefined'. */}
        <Box ref={viewRef} color="default" padding={4} width={600}>
          <Flex gap={{ column: 0, row: 4 }}>
            <Box width={200}>
              <Text>
                You need to add your data source URL to Pinterest so we can access your data source
                file and create Pins for your products. Before you do this, make sure you have
                prepared your data source and that you have claimed your website. If there are any
                errors with your data source file, you can learn how to troubleshoot them below.
                After you click Create Pins, you&apos;ll land back at the main data source page
                while your feed is being processed. Wait for a confirmation email from Pinterest
                about the status of your data source submission.
              </Text>
            </Box>

            <ButtonLink
              // @ts-expect-error - TS2322 - Type 'MutableRefObject<HTMLElement | null>' is not assignable to type 'LegacyRef<HTMLAnchorElement> | undefined'.
              ref={anchorRef}
              href="https://help.pinterest.com/en/business/article/data-source-ingestion"
              iconEnd="visit"
              onClick={() => setOpen(false)}
              size="lg"
              target="blank"
              text="Help"
            />

            {open && (
              <Layer>
                <Popover
                  anchor={anchorRef.current}
                  idealDirection="right"
                  onDismiss={() => {}}
                  positionRelativeToAnchor={false}
                  size="xs"
                >
                  <Box alignItems="center" display="flex" height={100} justifyContent="center">
                    <Text align="center">Content</Text>
                  </Box>
                </Popover>
              </Layer>
            )}
          </Flex>
        </Box>
      </ScrollBoundaryContainer>
    </Box>
  );
}
