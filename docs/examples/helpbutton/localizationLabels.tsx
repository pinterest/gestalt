import { ReactNode } from 'react';
import { DefaultLabelProvider, Flex, HelpButton } from 'gestalt';

export default function Example() {
  return (
    <DefaultLabelProvider
// @ts-expect-error - TS2740 - Type '{ HelpButton: { tooltipMessage: string; }; }' is missing the following properties from type '{ Accordion: { accessibilityCollapseLabel: string; accessibilityExpandLabel: string; }; ActivationCard: { accessibilityDismissButtonLabel: string; }; BannerOverlay: { accessibilityDismissButtonLabel: string; }; ... 17 more ...; Toast: { ...; }; }': Accordion, ActivationCard, BannerOverlay, BannerCallout, and 16 more.
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
