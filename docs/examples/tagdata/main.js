// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Flex, TagData } from 'gestalt';

export default function Example(): ReactNode {
  const [isSelected, setSelected] = useState(false);

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <TagData
        onRemove={() => {}}
        onTap={() => {
          setSelected((selected) => !selected);
        }}
        selected={isSelected}
        size="lg"
        text="Impressions"
      />
    </Flex>
  );
}
