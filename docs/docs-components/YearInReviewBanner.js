// @flow strict
import { type Node } from 'react';
import { Box, Button, Text, TapArea, Flex, Heading } from 'gestalt';

export default function YearInReviewBanner(): Node {
  return (
    <TapArea role="link" href="/year_in_review_2022">
      <Box
        dangerouslySetInlineStyle={{
          __style: {
            backgroundColor: 'var(--color-blue-skycicle-100)',
            border: '2px solid #111',
          },
        }}
        width="100%"
        minHeight="140px"
        paddingX={12}
        paddingY={4}
        display="flex"
        alignContent="center"
        flex="grow"
      >
        <Flex alignItems="center" justifyContent="between" wrap gap={3} flex="grow">
          <Box width="100px" />
          <Flex direction="column" gap={2}>
            <Heading accessibilityLevel={2} size="500">
              Hey! Check out our 2022 recap.
            </Heading>
            <Text>We’ve done so much this year and can’t wait to share it with you.</Text>
          </Flex>
          <Button selected text="View the recap" iconEnd="directional-arrow-right" size="lg" />
        </Flex>
      </Box>
    </TapArea>
  );
}
