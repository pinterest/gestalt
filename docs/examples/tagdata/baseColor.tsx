import { ReactNode } from 'react';
import { Box, Flex, TagData } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Box alignItems="center" display="flex" height="100%" justifyContent="center" width="50%">
        {/* @ts-expect-error - TS2741 - Property 'onRemove' is missing in type '{ baseColor: "primary"; size: "sm"; text: string; }' but required in type 'TagDataProps'. */}
        <TagData baseColor="primary" size="sm" text="Small TagData" />
      </Box>
      <Box
        alignItems="center"
        color="secondary"
        display="flex"
        height="100%"
        justifyContent="center"
        width="50%"
      >
        {/* @ts-expect-error - TS2741 - Property 'onRemove' is missing in type '{ baseColor: "secondary"; size: "sm"; text: string; }' but required in type 'TagDataProps'. */}
        <TagData baseColor="secondary" size="sm" text="Small TagData" />
      </Box>
    </Flex>
  );
}
