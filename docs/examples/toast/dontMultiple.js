// @flow strict
import { type Node } from 'react';
import { Avatar, Box, Flex, Icon, Toast } from 'gestalt';

export default function Example(): Node {
  return (
    <Box paddingY={4} height="100%" width="90%">
      <Flex
        alignItems="center"
        justifyContent="end"
        direction="column"
        height="100%"
        gap={2}
        width="100%"
      >
        <Toast
          thumbnail={{
            icon: <Icon accessibilityLabel="" icon="lightbulb" />,
          }}
          text="You have new recommendations"
          primaryAction={{ accessibilityLabel: 'View new recommendations', label: 'View' }}
        />
        <Toast text="Password updated" type="success" />
        <Toast
          thumbnail={{
            avatar: <Avatar src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" name="Keerthi" />,
          }}
          text="2-factor authentication added for Sabina Romero"
        />
      </Flex>
    </Box>
  );
}
