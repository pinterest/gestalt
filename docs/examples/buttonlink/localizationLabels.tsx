import { ReactNode } from 'react';
import { ButtonLink, DefaultLabelProvider, Flex } from 'gestalt';

export default function Example() {
  return (
    <DefaultLabelProvider
      labels={{
        Link: {
          accessibilityNewTabLabel: 'Öffnet eine neue Browser-Registerkarte.',
        },
      }}
    >
      <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
        <ButtonLink
          color="red"
          href="https://pinterest.com"
          iconEnd="visit"
          size="lg"
          text="Besuchen Sie Pinterest"
        />
      </Flex>
    </DefaultLabelProvider>
  );
}
