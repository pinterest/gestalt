// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Flex, TagData } from 'gestalt';

export default function Example(): ReactNode {
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
        tooltip={{ text: 'Average cost per 1K paid impressions' }}
      />
    </Flex>
  );
}
