// @flow strict
import { useState, type Node } from 'react';
import { AvatarGroup, Flex } from 'gestalt';

export default function Example(): Node {
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
    <Flex height="100%" width="100%" alignItems="center" justifyContent="center">
      <AvatarGroup
        accessibilityLabel="Visit group activity board."
        role="link"
        onClick={() => {}}
        size="md"
        collaborators={collaborators}
        href="#Role"
      />
    </Flex>
  );
}
