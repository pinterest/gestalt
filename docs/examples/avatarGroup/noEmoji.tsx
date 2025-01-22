import { AvatarGroup, Flex, useDangerouslyInGestaltExperiment } from 'gestalt';

export default function Example() {
  const isInVRExperiment = useDangerouslyInGestaltExperiment({
    webExperimentName: 'web_gestalt_visualrefresh',
    mwebExperimentName: 'web_gestalt_visualrefresh',
  });

  const collaborators = [
    {
      name: 'Keerthi',
    },
    {
      name: '🎉',
    },
    {
      name: 'Shanice',
      src: 'https://i.ibb.co/7tGKGvb/shanice.jpg',
    },
  ];

  const collaboratorsVR = [
    {
      color: 10,
      name: 'Sora',
    },
    {
      color: 4,
      name: '🙏🏾',
    },
    {
      name: 'Fatima',
      src: 'https://i.pinimg.com/originals/bf/bc/27/bfbc27685d81eb9a8f65c201ea661f0e.jpg',
    },
  ];

  const accessibilityLabel = isInVRExperiment
    ? 'Collaborators: Fatima, Sora, Ayesha.'
    : 'Collaborators: Keerthi, Alberto, Shanice.';

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <AvatarGroup
        accessibilityLabel={accessibilityLabel}
        collaborators={isInVRExperiment ? collaboratorsVR : collaborators}
        size="md"
      />
    </Flex>
  );
}
