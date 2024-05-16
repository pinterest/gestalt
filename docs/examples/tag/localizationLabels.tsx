import { ReactNode } from 'react';
import { DefaultLabelProvider, Flex, Tag } from 'gestalt';

export default function Example() {
  return (
    <DefaultLabelProvider
// @ts-expect-error - TS2740 - Type '{ TagData: { accessibilityRemoveIconLabel: string; }; }' is missing the following properties from type '{ Accordion: { accessibilityCollapseLabel: string; accessibilityExpandLabel: string; }; ActivationCard: { accessibilityDismissButtonLabel: string; }; BannerOverlay: { accessibilityDismissButtonLabel: string; }; ... 17 more ...; Toast: { ...; }; }': Accordion, ActivationCard, BannerOverlay, BannerCallout, and 16 more.
      labels={{
        TagData: {
          accessibilityRemoveIconLabel: 'Remove tag',
        },
      }}
    >
      <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
        <Tag onRemove={() => {}} text="Abgelaufene Kreditkarte" type="warning" />
      </Flex>
    </DefaultLabelProvider>
  );
}
