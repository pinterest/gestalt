// @flow strict
import { type Node } from 'react';
import { AvatarGroup, Flex } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex height="100%" width="100%" alignItems="center" justifyContent="center">
      <AvatarGroup
        size="md"
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
      />
    </Flex>
  );
}
