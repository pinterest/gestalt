import { BannerSlim, Box, Flex } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex direction="column" gap={{ column: 5, row: 0 }} width="100%">
        <BannerSlim
          iconAccessibilityLabel="Info"
          message="Idea Pins are now available across platforms."
          type="info"
        />
        <BannerSlim
          iconAccessibilityLabel="Info"
          message="Idea Pins are now available across platforms."
          type="infoBare"
        />
      </Flex>
    </Box>
  );
}
