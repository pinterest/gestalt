import { ActivationCard, Box, DefaultLabelProvider } from 'gestalt';

export default function Example() {
  return (
    <DefaultLabelProvider
      // @ts-expect-error - TS2740 - Type '{ ActivationCard: { accessibilityDismissButtonLabel: string; }; }' is missing the following properties from type '{ Accordion: { accessibilityCollapseLabel: string; accessibilityExpandLabel: string; }; ActivationCard: { accessibilityDismissButtonLabel: string; }; BannerOverlay: { accessibilityDismissButtonLabel: string; }; ... 17 more ...; Toast: { ...; }; }': Accordion, BannerOverlay, BannerCallout, ChartGraph, and 16 more.
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
