import { Avatar, Flex, useDangerouslyInGestaltExperiment } from 'gestalt';

export default function Example() {
  const isInVRExperiment = useDangerouslyInGestaltExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });

  return isInVRExperiment ? (
    <Flex
      alignContent="center"
      gap={{ row: 4, column: 0 }}
      height="100%"
      justifyContent="center"
      wrap
    >
      <Avatar
        name="Fatima"
        size="xs"
        src="https://i.pinimg.com/originals/bf/bc/27/bfbc27685d81eb9a8f65c201ea661f0e.jpg"
      />
      <Avatar color={1} name="Jamie" size="sm" />
      <Avatar
        name="Sora"
        size="md"
        src="https://i.pinimg.com/originals/ab/c5/4a/abc54abd85df131e90ca6b372368b738.jpg"
        verified
      />
      <Avatar color={7} name="Ayesha" size="lg" />
      <Avatar
        name="Ayesha"
        size="xl"
        src="https://i.pinimg.com/originals/c5/5c/ac/c55caca43a7c16766215ec165b649c1c.jpg"
      />
    </Flex>
  ) : (
    <Flex
      alignContent="center"
      gap={{ row: 4, column: 0 }}
      height="100%"
      justifyContent="center"
      wrap
    >
      <Avatar name="Keerthi" size="xs" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" />
      <Avatar name="Alberto" size="sm" />
      <Avatar name="Keerthi" size="md" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" verified />
      <Avatar name="Alberto" size="lg" />
      <Avatar name="Keerthi" size="xl" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" />
    </Flex>
  );
}
