import { useEffect, useRef, useState } from 'react';
import { AvatarGroup, Box, Flex, Layer, Popover, SearchField, Text } from 'gestalt';

export default function Example() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<null | HTMLAnchorElement | HTMLDivElement>(null);
  const ref = useRef<null | HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.focus();
  }, []);

  return (
    <Flex height="100%" width="100%">
      <Box height="200" marginTop={6} padding={2}>
        <AvatarGroup
          ref={anchorRef}
          accessibilityExpanded={open}
          accessibilityLabel={`Collaborators: 'Fatima, Ayesha,'  and 10 more. Add collaborators to this board.`}
          addCollaborators
          collaborators={[
            {
              name: 'Fatima',
              src: 'https://i.pinimg.com/originals/bf/bc/27/bfbc27685d81eb9a8f65c201ea661f0e.jpg',
            },
            {
              name: 'Ayesha',
              src: 'https://i.pinimg.com/originals/c5/5c/ac/c55caca43a7c16766215ec165b649c1c.jpg',
            },
            ...new Array(10),
          ]}
          onClick={() => setOpen((value) => !value)}
          role="button"
          size="md"
        />
      </Box>
      {open && (
        <Layer>
          <Popover
            anchor={anchorRef.current}
            idealDirection="down"
            onDismiss={() => setOpen(false)}
            positionRelativeToAnchor={false}
            size={500}
          >
            <Box
              flex="grow"
              marginBottom={8}
              marginEnd={4}
              marginStart={4}
              marginTop={6}
              width={360}
            >
              <Flex direction="column" gap={{ column: 4, row: 0 }}>
                <Text align="center" color="default" weight="bold">
                  Invite collaborators
                </Text>
                <SearchField
                  ref={ref}
                  accessibilityLabel="Search other users"
                  id="searchField"
                  onChange={() => {}}
                  placeholder="Search by name or email"
                  size="lg"
                />
              </Flex>
            </Box>
          </Popover>
        </Layer>
      )}
    </Flex>
  );
}
