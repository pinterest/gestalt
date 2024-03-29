// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Flex, TagData } from 'gestalt';

export default function Example(): ReactNode {
  const dataSources = [
    {
      id: 'data-1',
      name: 'Monthly Active',
      color: '01',
      tooltip: 'Monthly active users',
    },
    {
      id: 'data-2',
      name: 'Weekly Active',
      color: '02',
      tooltip: 'Weekly active users',
    },
    {
      id: 'data-3',
      name: 'Daily Active',
      color: '03',
      tooltip: 'Daily active users',
    },
  ];

  const allIds = dataSources.map(({ id }) => id);

  const [selectedItems, setSelectedItems] = useState(allIds);

  return (
    <Flex alignItems="center" gap={2} height="100%" justifyContent="center" width="100%">
      {dataSources.map(({ id, color, tooltip, name }) => (
        <TagData
          key={id}
          color={color}
          id={id}
          onTap={({ id: selectedId, selected }) => {
            if (!selectedId) {
              return;
            }

            setSelectedItems((currSelectedIds) =>
              !selected
                ? currSelectedIds.filter((tileId) => tileId !== selectedId)
                : currSelectedIds.concat([selectedId]),
            );
          }}
          selected={selectedItems.includes(id)}
          showCheckbox
          text={name}
          tooltip={{ text: tooltip }}
        />
      ))}
    </Flex>
  );
}
