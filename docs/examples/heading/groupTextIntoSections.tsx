import { Box, Flex, Text } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex direction="column" gap={{ column: 2, row: 0 }}>
        <Text size="500" weight="bold">
          (H1) The creator code
        </Text>
        <Text size="200">
          (p) Pinterest is building a positive online space for creators. That’s why we made the
          Creator Code: A commitment to kindness for everyone on Pinterest. We expect everyone to
          follow these guidelines and lead with kindness when you create new content or interact
          with other people on Pinterest.
        </Text>
        <Text size="400" weight="bold">
          (H2) Be kind
        </Text>
        <Text size="300" weight="bold">
          (H3) Express yourself
        </Text>
        <Text size="200">
          (p) Great content should highlight you and your ideas. Put your original spin on something
          and don’t be afraid to let your own perspective shine. For example: Fashion inspiration to
          freshen up a wardrobe.
        </Text>
      </Flex>
    </Box>
  );
}
