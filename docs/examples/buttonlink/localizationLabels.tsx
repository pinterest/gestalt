import { ReactNode } from 'react';
import { ButtonLink, DefaultLabelProvider, Flex } from 'gestalt';

export default function Example() {
  return (
    <DefaultLabelProvider
      // @ts-expect-error - TS2740 - Type '{ Link: { accessibilityNewTabLabel: string; }; }' is missing the following properties from type '{ Accordion: { accessibilityCollapseLabel: string; accessibilityExpandLabel: string; }; ActivationCard: { accessibilityDismissButtonLabel: string; }; BannerOverlay: { accessibilityDismissButtonLabel: string; }; ... 17 more ...; Toast: { ...; }; }': Accordion, ActivationCard, BannerOverlay, BannerCallout, and 16 more.
      labels={{
        Link: {
          accessibilityNewTabLabel: 'Öffnet eine neue Browser-Registerkarte.',
        },
      }}
    >
      <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
        <ButtonLink
          color="red"
          href="https://pinterest.com"
          iconEnd="visit"
          size="lg"
          text="Besuchen Sie Pinterest"
        />
      </Flex>
    </DefaultLabelProvider>
  );
}
