// @flow strict
import { type Node as ReactNode } from 'react';
import { AvatarGroup, Flex } from 'gestalt';

export default function Example(): ReactNode {
  const collaborators = [
    {
      name: 'Keerthi',
      src: 'https://i.ibb.co/ZfCZrY8/keerthi.jpg',
    },
    {
      name: 'Alberto',
      src: 'https://i.ibb.co/NsK2w5y/Alberto.jpg',
    },
    {
      name: 'Shanice',
      src: 'https://i.ibb.co/7tGKGvb/shanice.jpg',
    },
  ];

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <AvatarGroup
        accessibilityLabel="Visit group activity board."
        collaborators={collaborators}
        href="#Role"
        onClick={() => {}}
        role="link"
        size="md"
      />
    </Flex>
  );
}
