// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Flex, TagData } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex justifyContent="center" alignItems="center" height="100%" width="100%">
      <Box width="50%" height="100%" display="flex" justifyContent="center" alignItems="center">
        <TagData text="Small TagData" size="sm" baseColor="primary" />
      </Box>
      <Box
        width="50%"
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        color="secondary"
      >
        <TagData text="Small TagData" size="sm" baseColor="secondary" />
      </Box>
    </Flex>
  );
}
