import { useRef, useState } from 'react';
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

function List() {
  return (
    <Flex direction="column" gap={{ column: 2, row: 0 }}>
      {collaborators.map(({ name, src }) => (
        <Flex key={name} alignItems="center" gap={{ row: 2, column: 0 }}>
          <Avatar name={name} size="md" src={src} />
          <Text weight="bold">{name}</Text>
        </Flex>
      ))}
    </Flex>
  );
}

export default function Example() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<null | HTMLDivElement | HTMLAnchorElement>(null);

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <AvatarGroup
        // @ts-expect-error - TS2322 - Type '{ ref: MutableRefObject<HTMLDivElement | HTMLAnchorElement | null>; accessibilityLabel: string; collaborators: { name: string; src: string; }[]; onClick: () => void; role: "button"; size: "md"; }' is not assignable to type 'IntrinsicAttributes & AvatarGroupProps'.
        ref={anchorRef}
        accessibilityLabel="Click to see group collaborators."
        collaborators={collaborators}
        onClick={() => setOpen((value) => !value)}
        role="button"
        size="md"
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
              marginBottom={8}
              marginEnd={4}
              marginStart={4}
              marginTop={6}
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
