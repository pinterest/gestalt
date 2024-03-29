// @flow strict
import { type Node as ReactNode } from 'react';
import { Flex, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex direction="column" gap={{ column: 4, row: 0 }} width={350}>
        <Text>
          Our mission is to bring everyone the inspiration to create a life they love. To do that,
          we show you personalized content and ads we think you’ll be interested in based on
          information we collect from you and third parties. We only use that information where we
          have a proper legal basis for doing so.
        </Text>
      </Flex>
    </Flex>
  );
}
