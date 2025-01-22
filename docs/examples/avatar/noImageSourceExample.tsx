import { Avatar, Flex, useDangerouslyInGestaltExperiment } from 'gestalt';

export default function Example() {
  const isInVRExperiment = useDangerouslyInGestaltExperiment({
    webExperimentName: 'web_gestalt_visualrefresh',
    mwebExperimentName: 'web_gestalt_visualrefresh',
  });

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Avatar
        color={isInVRExperiment ? 1 : undefined}
        name={isInVRExperiment ? 'Rosa' : 'Keerthi'}
        size="lg"
      />
    </Flex>
  );
}
