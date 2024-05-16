import { ReactNode, useState } from 'react';
import { DefaultLabelProvider, Flex, TagData } from 'gestalt';

export default function Example() {
  const [isSelected, setSelected] = useState(false);

  return (
    <DefaultLabelProvider
// @ts-expect-error - TS2740 - Type '{ TagData: { accessibilityRemoveIconLabel: string; }; }' is missing the following properties from type '{ Accordion: { accessibilityCollapseLabel: string; accessibilityExpandLabel: string; }; ActivationCard: { accessibilityDismissButtonLabel: string; }; BannerOverlay: { accessibilityDismissButtonLabel: string; }; ... 17 more ...; Toast: { ...; }; }': Accordion, ActivationCard, BannerOverlay, BannerCallout, and 16 more.
      labels={{
        TagData: {
          accessibilityRemoveIconLabel: 'Tag entfernen',
        },
      }}
    >
      <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
        <TagData
          onRemove={() => {}}
          onTap={() => {
            setSelected((selected) => !selected);
          }}
          selected={isSelected}
          size="lg"
          text="Eindrücke"
        />
      </Flex>
    </DefaultLabelProvider>
  );
}
