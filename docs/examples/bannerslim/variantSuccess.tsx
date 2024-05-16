import {ReactNode} from 'react';
import { BannerSlim, Box, Flex } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex direction="column" gap={{ column: 5, row: 0 }} width="100%">
        <BannerSlim
          iconAccessibilityLabel="Info"
          message="Your ads are doing great! Keep it up by using recommendations to optimize your ad spend."
          type="success"
        />
        <BannerSlim
          iconAccessibilityLabel="Info"
          message="Your ads are doing great! Keep it up by using recommendations to optimize your ad spend."
          type="successBare"
        />
      </Flex>
    </Box>
  );
}
