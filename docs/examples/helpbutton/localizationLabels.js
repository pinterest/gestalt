// @flow strict
import { type Node } from 'react';
import { DefaultLabelProvider, Flex, HelpButton } from 'gestalt';

export default function Example(): Node {
  return (
    <DefaultLabelProvider
      // $FlowExpectedError[incompatible-type] For demostration purposes
      labels={{
        HelpButton: {
          tooltipMessage: 'Klicken Sie hier, um mehr zu erfahren',
        },
      }}
    >
      <Flex height="100%" justifyContent="center" alignItems="center">
        <HelpButton
          accessibilityLabel="Klicken Sie hier, um mehr über die Schaltfläche Hilfe zu erfahren."
          accessibilityPopoverLabel="Erweiterte Informationen über die Schaltfläche Hilfe"
          text="Informativer Kontext, der bei einem Klick angezeigt wird"
        />
      </Flex>
    </DefaultLabelProvider>
  );
}
