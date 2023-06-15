// @flow strict
import { type Node } from 'react';
import { AvatarGroup, Box, Flex, Link, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex height="100%" width="100%" alignItems="center" justifyContent="center">
      <Box width={600} height={100} padding={2}>
        <Flex alignItems="center" height="100%">
          <Box column={5} height="100%">
            <AvatarGroup
              accessibilityLabel="Collaborators: Keerthi, Alberto, and Shanice."
              size="fit"
              collaborators={[
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
              ]}
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
