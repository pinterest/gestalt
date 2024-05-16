import { ReactNode } from 'react';
import { Flex, Icon, Toast } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
{ /* @ts-expect-error - TS2741 - Property 'dismissButton' is missing in type '{ primaryAction: { accessibilityLabel: string; label: string; role: "button"; onClick: () => void; }; text: string; thumbnail: { icon: Element; }; }' but required in type 'ToastProps'. */}
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
