import { ReactNode } from 'react';
import { Flex, Icon, Toast } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Toast
        primaryAction={{
          accessibilityLabel: 'Edit',
          label: 'Edit',
          role: 'button',
          onClick: () => {},
        }}
        text="Save the link from your clipboard?"
        thumbnail={{
          icon: <Icon accessibilityLabel="Go to next steps" icon="link" />,
        }}
      />
    </Flex>
  );
}
