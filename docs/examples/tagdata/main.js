// @flow strict
import { type Node, useState } from 'react';
import { Flex, TagData } from 'gestalt';

export default function Example(): Node {
  const [isSelected, setSelected] = useState(false);

  return (
    <Flex justifyContent="center" alignItems="center" height="100%" width="100%">
      <TagData
        text="Impressions"
        size="lg"
        selected={isSelected}
        onTap={() => {
          setSelected((selected) => !selected);
        }}
        onRemove={() => {}}
      />
    </Flex>
  );
}
