import { Avatar, Box, Flex } from 'gestalt';

export default function Example() {
  const name = 'Sora';
  const src = 'https://i.pinimg.com/originals/ab/c5/4a/abc54abd85df131e90ca6b372368b738.jpg';

  return (
    <Flex alignItems="center" gap={2} height="100%" justifyContent="center" width="100%">
      <Avatar
        accessibilityLabel={`${name}, Verified account`}
        name={name}
        size="xs"
        src={src}
        verified
      />
      <Avatar
        accessibilityLabel={`${name}, Verified account`}
        name={name}
        size="sm"
        src={src}
        verified
      />
      <Avatar
        accessibilityLabel={`${name}, Verified account`}
        name={name}
        size="md"
        src={src}
        verified
      />
      <Avatar
        accessibilityLabel={`${name}, Verified account`}
        name={name}
        size="lg"
        src={src}
        verified
      />
      <Avatar
        accessibilityLabel={`${name}, Verified account`}
        name={name}
        size="xl"
        src={src}
        verified
      />
      <Box color="successBase" width={155}>
        <Avatar
          accessibilityLabel={`${name}, Verified account`}
          name={name}
          size="fit"
          src={src}
          verified
        />
      </Box>
    </Flex>
  );
}
