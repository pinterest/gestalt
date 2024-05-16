import { ReactNode } from 'react';
import { DefaultLabelProvider, Flex, HelpButton } from 'gestalt';

export default function Example() {
  return (
    <DefaultLabelProvider
      labels={{
        HelpButton: {
          tooltipMessage: 'Klicken Sie hier, um mehr zu erfahren',
        },
      }}
    >
      <Flex alignItems="center" height="100%" justifyContent="center">
        <HelpButton
          accessibilityLabel="Klicken Sie hier, um mehr über die Schaltfläche Hilfe zu erfahren."
          accessibilityPopoverLabel="Erweiterte Informationen über die Schaltfläche Hilfe"
          text="Informativer Kontext, der bei einem Klick angezeigt wird"
        />
      </Flex>
    </DefaultLabelProvider>
  );
}
