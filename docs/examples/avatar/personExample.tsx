import { Avatar, Flex, Text, useDangerouslyInGestaltExperiment } from 'gestalt';

export default function Example() {
  const isInVRExperiment = useDangerouslyInGestaltExperiment({
    webExperimentName: 'web_gestalt_visualrefresh',
    mwebExperimentName: 'web_gestalt_visualrefresh',
  });

  const firstName = isInVRExperiment ? 'Sora' : 'Keerthi';
  const fullName = isInVRExperiment ? 'Sora Suzuki' : 'Keerthi Singh';
  const src = isInVRExperiment
    ? 'https://i.pinimg.com/originals/ab/c5/4a/abc54abd85df131e90ca6b372368b738.jpg'
    : 'https://i.ibb.co/ZfCZrY8/keerthi.jpg';

  return (
    <Flex
      alignItems="center"
      direction="column"
      gap={{ column: 2, row: 0 }}
      height="100%"
      justifyContent="center"
      width="100%"
    >
      <Avatar name={firstName} size="xl" src={src} />
      <Text weight="bold">{fullName}</Text>
    </Flex>
  );
}
