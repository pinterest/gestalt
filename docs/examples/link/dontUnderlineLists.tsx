import { Box, Flex, Link, Text } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center">
      <Flex direction="row" gap={2} width="60%" wrap>
        {[
          'About',
          'Blog',
          'Business',
          'Careers',
          'Developers',
          'Removals',
          'Privacy',
          'Personalized ads',
          'Terms',
        ].map((item, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <Text key={idx} color="subtle" weight="bold">
            <Box paddingY={1}>
              <Link href="https://www.pinterest.com/" underline="always">
                {item}
              </Link>
            </Box>
          </Text>
        ))}
      </Flex>
    </Flex>
  );
}
