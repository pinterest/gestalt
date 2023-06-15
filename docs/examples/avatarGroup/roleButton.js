// @flow strict
import { type Node, useRef, useState } from 'react';
import { Avatar, AvatarGroup, Box, Flex, Layer, Popover, Text } from 'gestalt';

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

function List(): Node {
  return (
    <Flex direction="column" gap={{ column: 2, row: 0 }}>
      {collaborators.map(({ name, src }) => (
        <Flex key={name} alignItems="center" gap={{ row: 2, column: 0 }}>
          <Avatar size="md" name={name} src={src} />
          <Text weight="bold">{name}</Text>
        </Flex>
      ))}
    </Flex>
  );
}

export default function Example(): Node {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<null | HTMLDivElement | HTMLAnchorElement>(null);

  return (
    <Flex height="100%" width="100%" alignItems="center" justifyContent="center">
      <AvatarGroup
        accessibilityLabel="Click to see group collaborators."
        role="button"
        onClick={() => setOpen((value) => !value)}
        ref={anchorRef}
        size="md"
        collaborators={collaborators}
      />
      {open && (
        <Layer>
          <Popover
            anchor={anchorRef.current}
            idealDirection="down"
            onDismiss={() => setOpen(false)}
            positionRelativeToAnchor={false}
            size="xs"
          >
            <Box
              flex="grow"
              marginEnd={4}
              marginStart={4}
              marginTop={6}
              marginBottom={8}
              width={360}
            >
              <Flex direction="column" gap={{ column: 6, row: 0 }}>
                <Text align="center" color="default" weight="bold">
                  Collaborators
                </Text>
                <List />
              </Flex>
            </Box>
          </Popover>
        </Layer>
      )}
    </Flex>
  );
}
