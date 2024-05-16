import { ReactNode } from 'react';
import { BannerSlim, Box, Flex, Text } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex direction="column" gap={{ column: 6, row: 0 }} width="100%">
        <Text size="500" weight="bold">
          Ads overview
        </Text>
        <BannerSlim
          iconAccessibilityLabel="Error"
          message="There is an issue with your billing account so all ads currently paused."
          type="error"
        />
      </Flex>
    </Box>
  );
}
