import {ReactNode} from 'react';
import { Box, Flex, TagData } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Box alignItems="center" display="flex" height="100%" justifyContent="center" width="50%">
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
        <TagData baseColor="secondary" size="sm" text="Small TagData" />
      </Box>
    </Flex>
  );
}
