// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Flex, TagData } from 'gestalt';

export default function Example(): ReactNode {
  const [isSelected, setSelected] = useState(true);

  return (
    <Flex justifyContent="center" alignItems="center" height="100%" width="100%">
      <TagData
        disabled
        text="CPM"
        size="lg"
        onRemove={() => {}}
        showCheckbox
        selected={isSelected}
        onTap={() => {
          setSelected((selected) => !selected);
        }}
        tooltip={{ text: 'Average cost per 1K paid impressions' }}
      />
    </Flex>
  );
}
