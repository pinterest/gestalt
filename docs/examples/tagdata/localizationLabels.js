// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { DefaultLabelProvider, Flex, TagData } from 'gestalt';

export default function Example(): ReactNode {
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
