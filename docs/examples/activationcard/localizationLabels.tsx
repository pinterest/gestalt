import { ReactNode } from 'react';
import { ActivationCard, Box, DefaultLabelProvider } from 'gestalt';

export default function Example() {
  return (
    <DefaultLabelProvider
      labels={{
        ActivationCard: {
          accessibilityDismissButtonLabel: 'Entlassen.',
        },
      }}
    >
      <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
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
