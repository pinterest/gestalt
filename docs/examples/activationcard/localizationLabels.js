// @flow strict
import { type Node } from 'react';
import { ActivationCard, Box, DefaultLabelProvider } from 'gestalt';

export default function Example(): Node {
  return (
    <DefaultLabelProvider
      // $FlowExpectedError[incompatible-type] For demostration purposes
      labels={{
        ActivationCard: {
          accessibilityDismissButtonLabel: 'Entlassen.',
        },
      }}
    >
      <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
        <ActivationCard
          dismissButton={{
            accessibilityLabel: 'Karte entlassen.',
            onDismiss: () => {},
          }}
          link={{
            href: 'https://pinterest.com',
            label: 'Erfahren Sie mehr',
            accessibilityLabel: 'Erfahren Sie mehr über den Antragsstatus der Website.',
          }}
          message="Wir werden Sie per E-Mail benachrichtigen, sobald Ihre Website erfolgreich angemeldet wurde."
          status="pending"
          statusMessage="Anhängig"
          title="Beanspruchen Sie Ihre Website"
        />
      </Box>
    </DefaultLabelProvider>
  );
}
