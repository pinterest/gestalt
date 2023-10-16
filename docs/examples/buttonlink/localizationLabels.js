// @flow strict
import { type Node } from 'react';
import { ButtonLink, DefaultLabelProvider, Flex } from 'gestalt';

export default function Example(): Node {
  return (
    <DefaultLabelProvider
      // $FlowExpectedError[incompatible-type] For demostration purposes
      labels={{
        Link: {
          accessibilityNewTabLabel: 'Öffnet eine neue Browser-Registerkarte.',
        },
      }}
    >
      <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
        <ButtonLink
          iconEnd="visit"
          size="lg"
          color="red"
          text="Besuchen Sie Pinterest"
          href="https://pinterest.com"
        />
      </Flex>
    </DefaultLabelProvider>
  );
}
