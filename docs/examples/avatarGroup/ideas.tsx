import { AvatarGroup, Flex, useDangerouslyInGestaltExperiment } from 'gestalt';

export default function Example() {
  const isInVRExperiment = useDangerouslyInGestaltExperiment({
    webExperimentName: 'web_gestalt_visualrefresh',
    mwebExperimentName: 'web_gestalt_visualrefresh',
  });

  const collaborators = [
    {
      name: 'Art 1',
      src: 'https://i.ibb.co/d0pQsJz/stock3.jpg',
    },
    {
      name: 'Art 2',
      src: 'https://i.ibb.co/SB0pXgS/stock4.jpg',
    },
    {
      name: 'Art 3',
      src: 'https://i.ibb.co/jVR29XV/stock5.jpg',
    },
  ];

  const collaboratorsVR = [
    {
      name: 'Artwork 1',
      src: 'https://i.pinimg.com/564x/2e/f4/80/2ef48048ccdb68439ef6a6ef1d842e4f.jpg',
    },
    {
      name: 'Artwork 2',
      src: 'https://i.pinimg.com/564x/2a/37/68/2a3768dd4640aebfe93537ec37b016a6.jpg',
    },
    {
      name: 'Artwork 3',
      src: 'https://i.pinimg.com/564x/49/20/5d/49205d231674daf0ddaadd606dd0f60e.jpg',
    },
  ];

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <AvatarGroup
        accessibilityLabel="Collaborators: Keerthi, Alberto, Shanice."
        collaborators={isInVRExperiment ? collaboratorsVR : collaborators}
        size="md"
      />
    </Flex>
  );
}
