// @flow strict
import { type Node as ReactNode } from 'react';
import { Flex, TagData } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" gap={2} height="100%" justifyContent="center" width="100%" wrap>
      <TagData showCheckbox size="lg" text="Impressions" />
      <TagData onRemove={() => {}} size="sm" text="CPM" />
      <TagData size="md" text="Spend" />
    </Flex>
  );
}
