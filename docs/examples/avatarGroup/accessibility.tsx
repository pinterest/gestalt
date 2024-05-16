import { ReactNode, useEffect, useRef, useState } from 'react';
import { AvatarGroup, Box, Flex, Layer, Popover, SearchField, Text } from 'gestalt';

function SearchCollaboratorsField() {
  const ref = useRef<null | HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.focus();
  }, []);

  return (
    <SearchField
      ref={ref}
      accessibilityLabel="Search other users"
      id="searchField"
      onChange={() => {}}
      placeholder="Search by name or email"
      size="lg"
    />
  );
}

export default function Example() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<null | HTMLAnchorElement | HTMLDivElement>(null);

  return (
    <Flex height="100%" width="100%">
      <Box height="200" marginTop={6} padding={2}>
        <AvatarGroup
          ref={anchorRef}
          accessibilityExpanded={open}
          accessibilityLabel="Collaborators: Keerthi, Alberto, and 10 more. Add collaborators to this board."
          addCollaborators
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
            size="xl"
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
