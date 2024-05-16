import { ReactNode } from 'react';
import { Box, Flex, TagData } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Box
        alignItems="center"
        color="secondary"
        display="flex"
        height="100%"
        justifyContent="center"
        width="100%"
      >
        <Flex gap={2} wrap>
          {/* @ts-expect-error - TS2741 - Property 'onRemove' is missing in type '{ baseColor: "secondary"; text: string; }' but required in type 'TagDataProps'. */}
          <TagData baseColor="secondary" text="Impressions" />
          {/* @ts-expect-error - TS2741 - Property 'onRemove' is missing in type '{ baseColor: "secondary"; text: string; }' but required in type 'TagDataProps'. */}
          <TagData baseColor="secondary" text="CPM" />
          {/* @ts-expect-error - TS2741 - Property 'onRemove' is missing in type '{ baseColor: "secondary"; text: string; }' but required in type 'TagDataProps'. */}
          <TagData baseColor="secondary" text="Spend" />
        </Flex>
      </Box>
    </Flex>
  );
}
