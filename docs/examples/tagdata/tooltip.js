// @flow strict
import { type Node } from 'react';
import { Flex, TagData, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex justifyContent="center" alignItems="center" height="100%" width="100%" gap={2}>
      <TagData
        showCheckbox
        text="CPM"
        size="lg"
        onRemove={() => {}}
        tooltip={{ text: 'Average cost per 1K paid impressions' }}
      />
      <TagData
        showCheckbox
        text="MAU"
        size="lg"
        selected
        onRemove={() => {}}
        tooltip={{
          text: (
            <Text>
              <strong>Monthly Active Users</strong>
              <p>The total monthly users over the last 30 days</p>
            </Text>
          ),
        }}
      />
    </Flex>
  );
}
