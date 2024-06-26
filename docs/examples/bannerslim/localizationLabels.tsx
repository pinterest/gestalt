import { BannerSlim, Box, DefaultLabelProvider } from 'gestalt';

export default function Example() {
  return (
    <DefaultLabelProvider
      // @ts-expect-error - TS2740 - Type '{ BannerSlim: { accessibilityDismissButtonLabel: string; iconAccessibilityLabelError: string; iconAccessibilityLabelInfo: string; iconAccessibilityLabelRecommendation: string; iconAccessibilityLabelWarning: string; iconAccessibilityLabelSuccess: string; }; }' is missing the following properties from type '{ Accordion: { accessibilityCollapseLabel: string; accessibilityExpandLabel: string; }; ActivationCard: { accessibilityDismissButtonLabel: string; }; BannerOverlay: { accessibilityDismissButtonLabel: string; }; ... 17 more ...; Toast: { ...; }; }': Accordion, ActivationCard, BannerOverlay, BannerCallout, and 16 more.
      labels={{
        BannerSlim: {
          accessibilityDismissButtonLabel: 'Banner entlassen',
          iconAccessibilityLabelError: 'Fehler',
          iconAccessibilityLabelInfo: 'Informationen',
          iconAccessibilityLabelRecommendation: 'Recommendation',
          iconAccessibilityLabelWarning: 'Warnung',
          iconAccessibilityLabelSuccess: 'Erfolg',
        },
      }}
    >
      <Box alignItems="center" display="flex" height="100%" padding={8}>
        <BannerSlim
          message="Idea Pins sind jetzt plattformübergreifend verfügbar."
          onDismiss={() => {}}
          primaryAction={{
            accessibilityLabel: 'Beantragen Sie für betta Zugang zu Idea Pins',
            label: 'Zugang beantragen',
            onClick: () => {},
            role: 'button',
          }}
          type="info"
        />
      </Box>
    </DefaultLabelProvider>
  );
}
