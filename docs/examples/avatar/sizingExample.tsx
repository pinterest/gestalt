import { Avatar, Flex, useDangerouslyInGestaltExperiment } from 'gestalt';

export default function Example() {
  const isInVRExperiment = useDangerouslyInGestaltExperiment({
    webExperimentName: 'web_gestalt_visualrefresh',
    mwebExperimentName: 'web_gestalt_visualrefresh',
  });

  const name = isInVRExperiment ? 'Fatima' : 'Keerthi';
  const src = isInVRExperiment
    ? 'https://i.pinimg.com/originals/bf/bc/27/bfbc27685d81eb9a8f65c201ea661f0e.jpg'
    : 'https://i.ibb.co/ZfCZrY8/keerthi.jpg';

  return (
    <Flex alignItems="center" gap={4} height="100%" justifyContent="center" width="100%" wrap>
      <Avatar name={name} size="xs" src={src} />
      <Avatar name={name} size="sm" src={src} />
      <Avatar name={name} size="md" src={src} />
      <Avatar name={name} size="lg" src={src} />
      <Avatar name={name} size="xl" src={src} />
    </Flex>
  );
}
