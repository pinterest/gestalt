// @flow strict
import { type Node } from 'react';
import { Flex, TagData } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex justifyContent="center" alignItems="center" height="100%" width="100%" gap={2} wrap>
      <TagData showCheckbox text="Impressions" size="lg" />
      <TagData text="CPM" size="sm" onRemove={() => {}} />
      <TagData text="Spend" size="md" />
    </Flex>
  );
}
