// @flow strict
import { type Node as ReactNode } from 'react';
import { AvatarGroup, Flex } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <AvatarGroup
        accessibilityLabel="Collaborators: Keerthi, Alberto, Shanice."
        collaborators={[
          {
            name: 'Art 1',
            src: 'https://i.ibb.co/d0pQsJz/stock3.jpg',
          },
          {
            name: 'Art 2',
            src: 'https://i.ibb.co/SB0pXgS/stock4.jpg',
          },
          {
            name: 'Art 3',
            src: 'https://i.ibb.co/jVR29XV/stock5.jpg',
          },
        ]}
        size="md"
      />
    </Flex>
  );
}
