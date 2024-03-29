// @flow strict
import { type Node as ReactNode } from 'react';
import { Avatar, Box, Flex, Icon, Toast } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box height="100%" paddingY={4} width="90%">
      <Flex
        alignItems="center"
        direction="column"
        gap={2}
        height="100%"
        justifyContent="end"
        width="100%"
      >
        <Toast
          primaryAction={{
            accessibilityLabel: 'View new recommendations',
            label: 'View',
            role: 'button',
            onClick: () => {},
          }}
          text="You have new recommendations"
          thumbnail={{
            icon: <Icon accessibilityLabel="" icon="lightbulb" />,
          }}
        />
        <Toast text="Password updated" type="success" />
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
