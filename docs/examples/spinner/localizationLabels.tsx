import { DefaultLabelProvider, Flex, Spinner, useReducedMotion } from 'gestalt';

export default function Example() {
  const reduced = useReducedMotion();
  return (
    <DefaultLabelProvider
      // @ts-expect-error - TS2740 - Type '{ Spinner: { accessibilityLabel: string; }; }' is missing the following properties from type '{ Accordion: { accessibilityCollapseLabel: string; accessibilityExpandLabel: string; }; ActivationCard: { accessibilityDismissButtonLabel: string; }; BannerOverlay: { accessibilityDismissButtonLabel: string; }; ... 17 more ...; Toast: { ...; }; }': Accordion, ActivationCard, BannerOverlay, BannerCallout, and 16 more.
      labels={{
        Spinner: {
          accessibilityLabel: 'Analysetabelle wird geladen.',
        },
      }}
    >
      <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
        <Spinner show={!reduced} />
      </Flex>
    </DefaultLabelProvider>
  );
}
