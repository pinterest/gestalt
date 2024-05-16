import { BannerCallout, Box, DefaultLabelProvider, Flex } from 'gestalt';

export default function Example() {
  return (
    <DefaultLabelProvider
      // @ts-expect-error - TS2740 - Type '{ BannerCallout: { accessibilityDismissButtonLabel: string; iconAccessibilityLabelError: string; iconAccessibilityLabelInfo: string; iconAccessibilityLabelRecommendation: string; iconAccessibilityLabelWarning: string; iconAccessibilityLabelSuccess: string; }; }' is missing the following properties from type '{ Accordion: { accessibilityCollapseLabel: string; accessibilityExpandLabel: string; }; ActivationCard: { accessibilityDismissButtonLabel: string; }; BannerOverlay: { accessibilityDismissButtonLabel: string; }; ... 17 more ...; Toast: { ...; }; }': Accordion, ActivationCard, BannerOverlay, ChartGraph, and 16 more.
      labels={{
        BannerCallout: {
          accessibilityDismissButtonLabel: 'Banner entlassen.',
          iconAccessibilityLabelError: 'Fehler.',
          iconAccessibilityLabelInfo: 'Informationen.',
          iconAccessibilityLabelRecommendation: 'Empfehlung.',
          iconAccessibilityLabelWarning: 'Warnung.',
          iconAccessibilityLabelSuccess: 'Erfolg.',
        },
      }}
    >
      <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
        <Box paddingX={8} paddingY={8}>
          {/* @ts-expect-error - TS2741 - Property 'iconAccessibilityLabel' is missing in type '{ dismissButton: { accessibilityLabel: string; onDismiss: () => void; }; message: string; primaryAction: { accessibilityLabel: string; href: string; label: string; target: "blank"; role: "link"; }; secondaryAction: { ...; }; title: string; type: "info"; }' but required in type 'BannerCalloutProps'. */}
          <BannerCallout
            dismissButton={{
              accessibilityLabel: 'Verwerfen Sie dieses Banner.',
              onDismiss: () => {},
            }}
            message="Bewerben Sie sich beim Verified Merchant Program"
            primaryAction={{
              accessibilityLabel: 'Loslegen: Verified Merchant Program',
              href: 'https://pinterest.com',
              label: 'Loslegen',
              target: 'blank',
              role: 'link',
            }}
            secondaryAction={{
              accessibilityLabel: 'Erfahren Sie mehr: Verified Merchant Program',
              href: 'https://pinterest.com',
              label: 'Erfahren Sie mehr',
              target: 'blank',
              role: 'link',
            }}
            title="Ihr Geschäftskonto wurde erstellt!"
            type="info"
          />
        </Box>
      </Flex>
    </DefaultLabelProvider>
  );
}
