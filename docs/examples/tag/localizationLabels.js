// @flow strict
import { type Node } from 'react';
import { DefaultLabelProvider, Flex, Tag } from 'gestalt';

export default function Example(): Node {
  return (
    <DefaultLabelProvider
      // $FlowExpectedError[incompatible-type] For demostration purposes
      labels={{
        TagData: {
          accessibilityRemoveIconLabel: 'Remove tag',
        },
      }}
    >
      <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
        <Tag onRemove={() => {}} text="Abgelaufene Kreditkarte" type="warning" />
      </Flex>
    </DefaultLabelProvider>
  );
}
