import { ReactNode } from 'react';
import { Flex, Toast } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      {/* @ts-expect-error - TS2741 - Property 'dismissButton' is missing in type '{ helperLink: { text: string; accessibilityLabel: string; href: string; }; text: string; type: "error"; }' but required in type 'ToastProps'. */}
      <Toast
        helperLink={{
          text: 'Retry',
          accessibilityLabel: 'Retry connecting to the Internet',
          href: '#',
        }}
        text="You are not connected to the Internet."
        type="error"
      />
    </Flex>
  );
}
