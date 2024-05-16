import { ReactNode } from 'react';
import { Box, DefaultLabelProvider, Flex, Image, Mask, TapAreaLink, Text } from 'gestalt';

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
      <Flex alignItems="center" height="100%" justifyContent="center">
        <TapAreaLink
          fullWidth={false}
          href="#"
          onTap={({ event }) => event.preventDefault()}
          target="blank"
        >
          <Box borderStyle="lg" column={12} padding={3} width={200}>
            <Mask rounding={2}>
              <Image
                alt="Antelope Canyon"
                naturalHeight={1}
                naturalWidth={1}
                src="https://i.ibb.co/DwYrGy6/stock14.jpg"
              />
            </Mask>
            <Text align="center">Besuchen Sie Pinterest.com</Text>
          </Box>
        </TapAreaLink>
      </Flex>
    </DefaultLabelProvider>
  );
}
