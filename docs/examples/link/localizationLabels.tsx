import { Box, DefaultLabelProvider, Flex, Link, Text } from 'gestalt';

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
        <Box paddingX={8} paddingY={8}>
          <Text>
            <Link
              accessibilityLabel="Besuchen Sie das Business Center von Pinterest, um zu erfahren, wie Sie Ihr Geschäft ausbauen können."
              display="inlineBlock"
              externalLinkIcon="default"
              href="https://business.pinterest.com/advertise"
              target="blank"
            >
              Besuchen Sie das Business Center von Pinterest
            </Link>
          </Text>
        </Box>
      </Flex>
    </DefaultLabelProvider>
  );
}
