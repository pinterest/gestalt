// @flow strict
import { type Node as ReactNode } from 'react';
import { Flex, TagData } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" gap={2} height="100%" justifyContent="center" width="100%" wrap>
      <TagData showCheckbox text="Impressions" />
      <TagData showCheckbox text="CPM" />
      <TagData showCheckbox text="Spend" />
    </Flex>
  );
}
