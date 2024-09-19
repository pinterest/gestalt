import { useEffect, useRef, useState } from 'react';
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> e3b5eac32 (prettier)
import {
  AvatarGroup,
  Box,
  Flex,
  Layer,
  Popover,
  SearchField,
  Text,
  useDangerouslyInGestaltExperiment,
} from 'gestalt';
<<<<<<< HEAD
=======
import { AvatarGroup, Box, Flex, Layer, Popover, SearchField, Text, useDangerouslyInGestaltExperiment } from 'gestalt';
>>>>>>> da83e2698 (updated AvatarGroup examples)
=======
>>>>>>> e3b5eac32 (prettier)

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
  const isInVRExperiment = useDangerouslyInGestaltExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });

  const collaborators = [
    {
      name: 'Keerthi',
      src: 'https://i.ibb.co/ZfCZrY8/keerthi.jpg',
    },
    {
      name: 'Alberto',
      src: 'https://i.ibb.co/NsK2w5y/Alberto.jpg',
    },
    ...new Array(10),
  ];

  const collaboratorsVR = [
    {
      name: 'Fatima',
      src: 'https://i.pinimg.com/originals/bf/bc/27/bfbc27685d81eb9a8f65c201ea661f0e.jpg',
    },
    {
      name: 'Ayesha',
      src: 'https://i.pinimg.com/originals/c5/5c/ac/c55caca43a7c16766215ec165b649c1c.jpg',
    },
    ...new Array(10),
  ];

  const names = isInVRExperiment ? 'Fatima, Ayesha,' : 'Keerthi, Alberto,';

  return (
    <Flex height="100%" width="100%">
      <Box height="200" marginTop={6} padding={2}>
        <AvatarGroup
          ref={anchorRef}
          accessibilityExpanded={open}
          accessibilityLabel={`Collaborators: ${names} and 10 more. Add collaborators to this board.`}
          addCollaborators
          collaborators={isInVRExperiment ? collaboratorsVR : collaborators}
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
