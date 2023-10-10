// @flow strict
import { type Node, useState } from 'react';
import { DefaultLabelProvider, Flex, TagData } from 'gestalt';

export default function Example(): Node {
  const [isSelected, setSelected] = useState(false);

  return (
    <DefaultLabelProvider
      // $FlowExpectedError[incompatible-type] For demostration purposes
      labels={{
        TagData: {
          accessibilityRemoveIconLabel: 'Tag entfernen',
        },
      }}
    >
      <Flex justifyContent="center" alignItems="center" height="100%" width="100%">
        <TagData
          text="Eindrücke"
          size="lg"
          selected={isSelected}
          onTap={() => {
            setSelected((selected) => !selected);
          }}
          onRemove={() => {}}
        />
      </Flex>
    </DefaultLabelProvider>
  );
}
