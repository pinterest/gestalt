import { ReactNode } from 'react';
import { Avatar, Box, TapArea, Text } from 'gestalt';

export default function TapAreaExample() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Box borderStyle="sm" rounding={4} width={170}>
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
