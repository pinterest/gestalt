// @flow strict
import { type Node } from 'react';
import { Avatar, Box, TapArea, Text } from 'gestalt';

export default function TapAreaExample(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Box rounding={4} borderStyle="sm" width={170}>
        <TapArea rounding={4}>
          <Box alignItems="center" direction="column" display="flex" padding={3}>
            <Avatar name="Alberto" size="xl" src="https://i.ibb.co/NsK2w5y/Alberto.jpg" verified />
            <Text weight="bold">Alberto&apos;s Profile</Text>
          </Box>
        </TapArea>
      </Box>
    </Box>
  );
}
