// @flow strict
import { type Node } from 'react';
import { Box, Flex, TagData } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex justifyContent="center" alignItems="center" height="100%" width="100%">
      <Box width="50%" height="100%" display="flex" justifyContent="center" alignItems="center">
        <TagData text="Small TagData" size="sm" baseColor="default" />
      </Box>
      <Box
        width="50%"
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        color="tertiary"
      >
        <TagData text="Small TagData" size="sm" baseColor="white" />
      </Box>
    </Flex>
  );
}
