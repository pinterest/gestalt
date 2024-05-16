import {ReactNode} from 'react';
import { DefaultLabelProvider, Flex, Tag } from 'gestalt';

export default function Example() {
  return (
    (<DefaultLabelProvider
      labels={{
        TagData: {
          accessibilityRemoveIconLabel: 'Remove tag',
        },
      }}
    >
      <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
        <Tag onRemove={() => {}} text="Abgelaufene Kreditkarte" type="warning" />
      </Flex>
    </DefaultLabelProvider>)
  );
}
