// @flow strict
import { type Node as ReactNode } from 'react';
import { Flex, TagData } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex justifyContent="center" alignItems="center" height="100%" width="100%" gap={2} wrap>
      <TagData text="Impressions" onRemove={() => {}} />
      <TagData text="Spend" onRemove={() => {}} />
    </Flex>
  );
}
