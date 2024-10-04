import { Avatar, Flex, useDangerouslyInGestaltExperiment } from 'gestalt';

export default function Example() {
  const isInVRExperiment = useDangerouslyInGestaltExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });

  const name = isInVRExperiment ? 'Sora' : 'Shanice';
  const src = isInVRExperiment
    ? 'https://i.pinimg.com/originals/ab/c5/4a/abc54abd85df131e90ca6b372368b738.jpg'
    : 'https://i.ibb.co/7tGKGvb/shanice.jpg';

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Avatar
        accessibilityLabel={`${name}, Verified account`}
        name={name}
        size="lg"
        src={src}
        verified
      />
    </Flex>
  );
}
