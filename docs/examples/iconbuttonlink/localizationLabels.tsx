import { DefaultLabelProvider, Flex, IconButtonLink } from 'gestalt';

export default function Example() {
  return (
    <DefaultLabelProvider
      // @ts-expect-error - TS2740 - Type '{ Link: { accessibilityNewTabLabel: string; }; }' is missing the following properties from type '{ Accordion: { accessibilityCollapseLabel: string; accessibilityExpandLabel: string; }; ActivationCard: { accessibilityDismissButtonLabel: string; }; BannerOverlay: { accessibilityDismissButtonLabel: string; }; ... 17 more ...; Toast: { ...; }; }': Accordion, ActivationCard, BannerOverlay, BannerCallout, and 16 more.
      labels={{
        Link: {
          accessibilityNewTabLabel: 'Öffnet eine neue Browser-Registerkarte.',
          accessibilityDownloadLabel: 'Es lädt eine Datei herunter.',
        },
      }}
    >
      <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
        <IconButtonLink
          accessibilityLabel=""
          href="#"
          icon="visit"
          onClick={({ event, dangerouslyDisableOnNavigation }) => {
            event.preventDefault();
            dangerouslyDisableOnNavigation();
          }}
          target="blank"
          tooltip={{ text: 'Besuchen Sie Pinterest' }}
        />
      </Flex>
    </DefaultLabelProvider>
  );
}
