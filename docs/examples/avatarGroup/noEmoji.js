// @flow strict
import { type Node as ReactNode } from 'react';
import { AvatarGroup, Flex } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex height="100%" width="100%" alignItems="center" justifyContent="center">
      <AvatarGroup
        size="md"
        accessibilityLabel="Collaborators: Keerthi, Alberto, Shanice."
        collaborators={[
          {
            name: 'Keerthi',
          },
          {
            name: '🎉',
          },
          {
            name: 'Shanice',
            src: 'https://i.ibb.co/7tGKGvb/shanice.jpg',
          },
        ]}
      />
    </Flex>
  );
}
