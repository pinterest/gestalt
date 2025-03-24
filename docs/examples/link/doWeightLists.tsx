import { Avatar, Box, Flex, Link, Text } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" gap={2} height="100%" justifyContent="center" width="100%">
      <Box aria-hidden>
        <Avatar
          accessibilityLabel="Shanice Romero"
          name="Shanice Romero"
          size="sm"
          src="https://i.pinimg.com/originals/ab/c5/4a/abc54abd85df131e90ca6b372368b738.jpg"
        />
      </Box>
      <Text>
        <Text inline weight="bold">
          <Link display="inline" href="https://www.pinterest.com" underline="hover">
            {' '}
            Shanice Romero{' '}
          </Link>
        </Text>{' '}
        saved to
        <Text inline weight="bold">
          <Link display="inline" href="https://www.pinterest.com" underline="hover">
            {' '}
            Capoeira{' '}
          </Link>
        </Text>
      </Text>
    </Flex>
  );
}
