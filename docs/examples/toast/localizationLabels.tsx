import { ReactNode } from 'react';
import { DefaultLabelProvider, Flex, Toast } from 'gestalt';

export default function Example() {
  return (
    <DefaultLabelProvider
// @ts-expect-error - TS2740 - Type '{ Toast: { accessibilityDismissButtonLabel: string; accessibilityIconSuccessLabel: string; accessibilityIconErrorLabel: string; accessibilityProcessingLabel: string; }; }' is missing the following properties from type '{ Accordion: { accessibilityCollapseLabel: string; accessibilityExpandLabel: string; }; ActivationCard: { accessibilityDismissButtonLabel: string; }; BannerOverlay: { accessibilityDismissButtonLabel: string; }; ... 17 more ...; Toast: { ...; }; }': Accordion, ActivationCard, BannerOverlay, BannerCallout, and 16 more.
      labels={{
        Toast: {
          accessibilityDismissButtonLabel: 'Den Toast verwerfen',
          accessibilityIconSuccessLabel: 'Erfolgsmeldung',
          accessibilityIconErrorLabel: 'Fehlermeldung',
          accessibilityProcessingLabel: 'Nachricht bearbeiten',
        },
      }}
    >
      <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
        <Toast
          dismissButton={{ onDismiss: () => {} }}
          text="Passwort aktualisiert"
          type="success"
        />
      </Flex>
    </DefaultLabelProvider>
  );
}
