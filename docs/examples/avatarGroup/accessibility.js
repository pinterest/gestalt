// @flow strict
import { useState, useRef, useEffect, type Node } from 'react';
import { Flex, AvatarGroup, Text, SearchField, Layer, Popover, Box } from 'gestalt';

function SearchCollaboratorsField(): Node {
  const ref = useRef<null | HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <SearchField
      accessibilityLabel="Search other users"
      id="searchField"
      onChange={() => {}}
      placeholder="Search by name or email"
      size="lg"
      ref={ref}
    />
  );
}

export default function Example(): Node {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<null | HTMLAnchorElement | HTMLDivElement>(null);

  return (
    <Flex height="100%" width="100%">
      <Box height="200" marginTop={6} padding={2}>
        <AvatarGroup
          accessibilityLabel="Collaborators: Keerthi, Alberto, and 10 more. Add collaborators to this board."
          accessibilityExpanded={open}
          addCollaborators
          role="button"
          onClick={() => setOpen((value) => !value)}
          ref={anchorRef}
          size="md"
          collaborators={[
            {
              name: 'Keerthi',
              src: 'https://i.ibb.co/ZfCZrY8/keerthi.jpg',
            },
            {
              name: 'Alberto',
              src: 'https://i.ibb.co/NsK2w5y/Alberto.jpg',
            },
            ...new Array(10),
          ]}
        />
      </Box>
      {open && (
        <Layer>
          <Popover
            anchor={anchorRef.current}
            idealDirection="down"
            onDismiss={() => setOpen(false)}
            positionRelativeToAnchor={false}
            size="xl"
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
                  Invite collaborators
                </Text>
                <SearchCollaboratorsField />
              </Flex>
            </Box>
          </Popover>
        </Layer>
      )}
    </Flex>
  );
}
