// @flow strict
import { type Node, useState } from 'react';
import { Flex, TagData } from 'gestalt';

export default function Example(): Node {
  const [isSelected, setSelected] = useState(false);

  return (
    <Flex justifyContent="center" alignItems="center" height="100%" width="100%">
      <TagData
        showCheckbox
        text="CPM"
        size="lg"
        selected={isSelected}
        onTap={() => {
          setSelected((selected) => !selected);
        }}
        onRemove={() => {}}
        tooltip={{ text: 'Average cost per 1K paid impressions' }}
      />
    </Flex>
  );
}
