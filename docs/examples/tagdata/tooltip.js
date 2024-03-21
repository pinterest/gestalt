// @flow strict
import { type Node as ReactNode } from 'react';
import { Flex, TagData } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" gap={2} height="100%" justifyContent="center" width="100%">
      <TagData
        onRemove={() => {}}
        showCheckbox
        size="lg"
        text="CPM"
        tooltip={{ text: 'Average cost per 1K paid impressions' }}
      />
      <TagData
        onRemove={() => {}}
        selected
        showCheckbox
        size="lg"
        text="MAU"
        tooltip={{
          text: ['Monthly Active Users', 'The total monthly users over the last 30 days'],
        }}
      />
    </Flex>
  );
}
