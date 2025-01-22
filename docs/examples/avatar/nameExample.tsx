import { Avatar, Flex, Text, useDangerouslyInGestaltExperiment } from 'gestalt';

export default function Example() {
  const isInVRExperiment = useDangerouslyInGestaltExperiment({
    webExperimentName: 'web_gestalt_visualrefresh',
    mwebExperimentName: 'web_gestalt_visualrefresh',
  });

  const name = isInVRExperiment ? 'Ayesha Rashad' : 'Shanice Byles';
  const src = isInVRExperiment
    ? 'https://i.pinimg.com/originals/c5/5c/ac/c55caca43a7c16766215ec165b649c1c.jpg'
    : 'https://i.ibb.co/7tGKGvb/shanice.jpg';

  return (
    <Flex
      alignItems="center"
      direction="column"
      gap={{ column: 2, row: 0 }}
      height="100%"
      justifyContent="center"
      width="100%"
    >
      <Avatar name={name} size="xl" src={src} />
      <Text weight="bold">{name}</Text>
    </Flex>
  );
}
