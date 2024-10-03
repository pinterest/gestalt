import { Avatar, Flex, Text, useDangerouslyInGestaltExperiment } from 'gestalt';

export default function Example() {
  const isInVRExperiment = useDangerouslyInGestaltExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });

  const src = isInVRExperiment
    ? 'https://i.pinimg.com/564x/b9/f0/56/b9f0561e2d7927fa427f2306a41bce11.jpg'
    : 'https://i.ibb.co/jVR29XV/stock5.jpg';

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex alignItems="center" direction="column" gap={{ column: 2, row: 0 }}>
        <Avatar name="Artwork" size="xl" src={src} />
        <Text weight="bold">Explore Typographic Art</Text>
      </Flex>
    </Flex>
  );
}
