// @flow strict
import { type Node } from 'react';
import { Flex, TagData } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex justifyContent="center" alignItems="center" height="100%" width="100%" gap={2} wrap>
      <TagData showCheckbox text="Impressions" />
      <TagData showCheckbox text="CPM" />
      <TagData showCheckbox text="Spend" />
    </Flex>
  );
}
