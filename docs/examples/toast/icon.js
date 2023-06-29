// @flow strict
import { type Node } from 'react';
import { Flex, Icon, Toast } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex justifyContent="center" alignItems="center" width="100%" height="100%">
      <Toast
        primaryAction={{ accessibilityLabel: 'Edit', label: 'Edit' }}
        text="Save the link from your clipboard?"
        thumbnail={{
          icon: <Icon accessibilityLabel="Go to next steps" icon="link" />,
        }}
      />
    </Flex>
  );
}
