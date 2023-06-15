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
            name: 'PinAble',
            src: 'https://i.pinimg.com/75x75_RS/93/ad/66/93ad660e38e4f4315869424ea90e7ea4.jpg',
          },
          {
            name: 'Alberto',
            src: 'https://i.ibb.co/NsK2w5y/Alberto.jpg',
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
