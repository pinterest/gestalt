// @flow strict
import { type Node as ReactNode } from 'react';
import { Flex, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex width={300}>
        <Text>
          For campaign optimization and delivery,{' '}
          <Text weight="bold" inline>
            set optimization and delivery at the campaign level
          </Text>{' '}
          so all ad groups have the same values.
        </Text>
      </Flex>
    </Flex>
  );
}
