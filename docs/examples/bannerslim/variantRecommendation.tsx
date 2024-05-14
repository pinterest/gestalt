import { BannerSlim, Box, Flex } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex direction="column" gap={{ column: 5, row: 0 }} width="100%">
        <BannerSlim
          iconAccessibilityLabel="Recommendation"
          message="Advertise with confidence! When you run ads on Pinterest, you'll find recommendations to improve them here."
          type="recommendation"
        />
        <BannerSlim
          iconAccessibilityLabel="Recommendation"
          message="Advertise with confidence! When you run ads on Pinterest, you'll find recommendations to improve them here."
          type="recommendationBare"
        />
      </Flex>
    </Box>
  );
}
