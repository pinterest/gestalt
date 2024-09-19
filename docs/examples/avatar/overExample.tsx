import { Avatar, Box, Flex, Mask, Text, useDangerouslyInGestaltExperiment } from 'gestalt';

export default function Example() {
  const isInVRExperiment = useDangerouslyInGestaltExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });

<<<<<<< HEAD
<<<<<<< HEAD
  const src = isInVRExperiment
    ? 'https://i.pinimg.com/564x/8e/fb/f7/8efbf75008c34394104ef9568c038d2d.jpg'
    : 'https://i.ibb.co/jVR29XV/stock5.jpg';
=======
  const src = isInVRExperiment ? 'https://i.pinimg.com/564x/8e/fb/f7/8efbf75008c34394104ef9568c038d2d.jpg' : 'https://i.ibb.co/jVR29XV/stock5.jpg';
>>>>>>> 2003c2dd8 (examples fixed)
=======
  const src = isInVRExperiment
    ? 'https://i.pinimg.com/564x/8e/fb/f7/8efbf75008c34394104ef9568c038d2d.jpg'
    : 'https://i.ibb.co/jVR29XV/stock5.jpg';
>>>>>>> e3b5eac32 (prettier)

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Box position="relative">
        <Mask wash>
          <Avatar name="Artwork" size="xl" src={src} />
        </Mask>
        <Box left position="absolute" top>
          <Text weight="bold">Explore Typographic Art</Text>
        </Box>
      </Box>
    </Flex>
  );
}
