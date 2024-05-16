import { ReactNode, useState } from 'react';
import { Flex, TagData } from 'gestalt';

export default function Example() {
  const [isSelected, setSelected] = useState(true);

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <TagData
        disabled
        onRemove={() => {}}
        onTap={() => {
          setSelected((selected) => !selected);
        }}
        selected={isSelected}
        showCheckbox
        size="lg"
        text="CPM"
// @ts-expect-error - TS2741 - Property 'children' is missing in type '{ text: string; }' but required in type 'ExtendedTooltipProps'.
        tooltip={{ text: 'Average cost per 1K paid impressions' }}
      />
    </Flex>
  );
}
