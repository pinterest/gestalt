import { useRef, useState } from 'react';
import { Avatar, AvatarGroup, Box, Flex, Layer, Popover, Text } from 'gestalt';

export default function Example() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<null | HTMLDivElement | HTMLAnchorElement>(null);

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <AvatarGroup
        ref={anchorRef}
        accessibilityLabel="Click to see group collaborators."
        collaborators={[
          {
            name: 'Fatima',
            src: 'https://i.pinimg.com/originals/bf/bc/27/bfbc27685d81eb9a8f65c201ea661f0e.jpg',
          },
          {
            name: 'Sora',
            src: 'https://i.pinimg.com/originals/ab/c5/4a/abc54abd85df131e90ca6b372368b738.jpg',
          },
          {
            name: 'Ayesha',
            src: 'https://i.pinimg.com/originals/c5/5c/ac/c55caca43a7c16766215ec165b649c1c.jpg',
          },
        ]}
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
                <Text align="start" color="default" weight="bold">
                  Collaborators
                </Text>
                <Flex direction="column" gap={{ column: 2, row: 0 }}>
                  {[
                    {
                      name: 'Fatima',
                      src: 'https://i.pinimg.com/originals/bf/bc/27/bfbc27685d81eb9a8f65c201ea661f0e.jpg',
                    },
                    {
                      name: 'Sora',
                      src: 'https://i.pinimg.com/originals/ab/c5/4a/abc54abd85df131e90ca6b372368b738.jpg',
                    },
                    {
                      name: 'Ayesha',
                      src: 'https://i.pinimg.com/originals/c5/5c/ac/c55caca43a7c16766215ec165b649c1c.jpg',
                    },
                  ].map(({ name, src }) => (
                    <Flex key={name} alignItems="center" gap={{ row: 2, column: 0 }}>
                      <Avatar name={name} size="md" src={src} />
                      <Text weight="bold">{name}</Text>
                    </Flex>
                  ))}
                </Flex>
              </Flex>
            </Box>
          </Popover>
        </Layer>
      )}
    </Flex>
  );
}
