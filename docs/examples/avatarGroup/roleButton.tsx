import { useRef, useState } from 'react';
import {
  Avatar,
  AvatarGroup,
  Box,
  Flex,
  Layer,
  Popover,
  Text,
  useDangerouslyInGestaltExperiment,
} from 'gestalt';

export default function Example() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<null | HTMLDivElement | HTMLAnchorElement>(null);
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
    {
      name: 'Shanice',
      src: 'https://i.ibb.co/7tGKGvb/shanice.jpg',
    },
  ];

  const collaboratorsVR = [
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
  ];

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <AvatarGroup
        ref={anchorRef}
        accessibilityLabel="Click to see group collaborators."
        collaborators={isInVRExperiment ? collaboratorsVR : collaborators}
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
                  {!isInVRExperiment &&
                    collaborators.map(({ name, src }) => (
                      <Flex key={name} alignItems="center" gap={{ row: 2, column: 0 }}>
                        <Avatar name={name} size="md" src={src} />
                        <Text weight="bold">{name}</Text>
                      </Flex>
                    ))}
                  {isInVRExperiment &&
                    collaboratorsVR.map(({ name, src }) => (
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
