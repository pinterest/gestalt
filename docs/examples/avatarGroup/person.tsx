import { AvatarGroup, Flex, useDangerouslyInGestaltExperiment } from 'gestalt';

export default function Example() {
  const isInVRExperiment = useDangerouslyInGestaltExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });

  const accessibilityLabel = isInVRExperiment
<<<<<<< HEAD
<<<<<<< HEAD
    ? 'Collaborators: Fatima, Mami Wata, Ayesha.'
    : 'Collaborators: Keerthi, Mami Wata, Shanice.';
=======
  ? 'Collaborators: Fatima, Mami Wata, Ayesha.'
  : 'Collaborators: Keerthi, Mami Wata, Shanice.';
>>>>>>> da83e2698 (updated AvatarGroup examples)
=======
    ? 'Collaborators: Fatima, Mami Wata, Ayesha.'
    : 'Collaborators: Keerthi, Mami Wata, Shanice.';
>>>>>>> e3b5eac32 (prettier)

  const collaborators = [
    {
      name: 'PinAble',
      src: 'https://i.pinimg.com/75x75_RS/93/ad/66/93ad660e38e4f4315869424ea90e7ea4.jpg',
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
      name: 'Mami Wata',
      src: 'https://i.pinimg.com/564x/52/ed/6a/52ed6a9475eeb7e0133fb6d3a8b6aaa4.jpg',
    },
    {
      name: 'Ayesha',
      src: 'https://i.pinimg.com/originals/c5/5c/ac/c55caca43a7c16766215ec165b649c1c.jpg',
    },
  ];

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
