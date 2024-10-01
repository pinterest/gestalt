import { AvatarGroup, Box, Flex, Link, Text, useDangerouslyInGestaltExperiment } from 'gestalt';

export default function Example() {
  const isInVRExperiment = useDangerouslyInGestaltExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });

  const collaborators = [
    {
      name: 'Keerthi',
      src: 'https://i.ibb.co/ZfCZrY8/keerthi.jpg',
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
      name: 'Sora',
      src: 'https://i.pinimg.com/originals/ab/c5/4a/abc54abd85df131e90ca6b372368b738.jpg',
    },
    {
      name: 'Ayesha',
      src: 'https://i.pinimg.com/originals/c5/5c/ac/c55caca43a7c16766215ec165b649c1c.jpg',
    },
  ];

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Box height={100} padding={2} width={600}>
        <Flex alignItems="center" height="100%">
          <Box column={5} height="100%">
            <AvatarGroup
              accessibilityLabel={
                isInVRExperiment
                  ? 'Collaborators: Fatima, Sora, and Ayesha.'
                  : 'Collaborators: Keerthi, Alberto, and Shanice.'
              }
              collaborators={isInVRExperiment ? collaboratorsVR : collaborators}
              size={isInVRExperiment ? 'md' : 'fit'}
            />
          </Box>
          <Box column={7} marginStart={2}>
            <Text inline>The </Text>
            <Text inline weight="bold">
              <Link
                display="inlineBlock"
                href="https://www.pinterest.com/search/boards/?q=quick%20vegan%20recipes&rs=typed&term_meta[]=quick%7Ctyped&term_meta[]=vegan%7Ctyped&term_meta[]=recipes%7Ctyped"
              >
                Quick Vegan Recipes{' '}
              </Link>
            </Text>
            <Text inline> board has 3 followers.</Text>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}
