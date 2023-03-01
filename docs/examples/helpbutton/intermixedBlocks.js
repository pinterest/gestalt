// @flow strict
import { type Node } from 'react';
import { Box, Flex, HelpButton, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex height="100%" justifyContent="center" alignItems="center" gap={1}>
      <Box width={300}>
        <Text inline>
          See the total impact of your paid and organic content working together to increase page
          visits
          <Box display="inlineBlock">
            <HelpButton
              accessibilityLabel="Click to learn more about the number of visits"
              accessibilityPopoverLabel="Expanded information about the number of visits"
              text="Number of times people visited your website after seeing your content on Pinterest"
            />
          </Box>{' '}
          add-to-carts{' '}
          <Box display="inlineBlock">
            <HelpButton
              accessibilityLabel="Click to learn more about the number of visits"
              accessibilityPopoverLabel="Expanded information about the number of visits"
              text="Number of times people added your products to their carts after interacting with your Pins"
            />
          </Box>{' '}
          and checkouts
          <Box display="inlineBlock">
            <HelpButton
              accessibilityLabel="Click to learn more about the number of visits"
              accessibilityPopoverLabel="Expanded information about the number of visits"
              text="Number of checkouts stemming from your Pins and ads"
            />
          </Box>
          .
        </Text>
      </Box>
    </Flex>
  );
}
