import { ReactNode } from 'react';
import { Avatar, Box, Flex, Toast } from 'gestalt';

export default function Example() {
  return (
    <Box height="100%" paddingY={4} width="100%">
      <Flex alignItems="end" height="100%" justifyContent="center" width="100%">
        <Toast
          text="2-factor authentication added for Sabina Romero"
          thumbnail={{
            avatar: <Avatar name="Keerthi" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" />,
          }}
        />
      </Flex>
    </Box>
  );
}
