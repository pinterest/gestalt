import { BannerUpsell, Box, DefaultLabelProvider, Icon } from 'gestalt';

export default function Example() {
  return (
    <DefaultLabelProvider
      // @ts-expect-error - TS2740 - Type '{ BannerUpsell: { accessibilityDismissButtonLabel: string; }; }' is missing the following properties from type '{ Accordion: { accessibilityCollapseLabel: string; accessibilityExpandLabel: string; }; ActivationCard: { accessibilityDismissButtonLabel: string; }; BannerOverlay: { accessibilityDismissButtonLabel: string; }; ... 17 more ...; Toast: { ...; }; }': Accordion, ActivationCard, BannerOverlay, BannerCallout, and 16 more.
      labels={{
        BannerUpsell: {
          accessibilityDismissButtonLabel: 'Dismiss banner',
        },
      }}
    >
      <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
        <BannerUpsell
          dismissButton={{ onDismiss: () => {} }}
          imageData={{
            component: <Icon accessibilityLabel="" color="default" icon="send" size={32} />,
          }}
          message="Verfolgen Sie die Anzeigenkonvertierung - Umsatz, Traffic und mehr - mit dem Pinterest Tag"
          primaryAction={{
            label: 'Beanspruche jetzt',
            accessibilityLabel: 'Beanspruche Guthaben jetzt',
            role: 'button',
            onClick: () => {},
          }}
          title="Fast fertig! Beenden Sie die Installation Ihres Pinterest-Tags und erhalten Sie ein Guthaben von 10 Euro"
        />
      </Box>
    </DefaultLabelProvider>
  );
}
