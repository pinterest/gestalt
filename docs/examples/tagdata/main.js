// @flow strict
import { type Node, useState } from 'react';
import { TagData } from 'gestalt';

export default function Example(): Node {
  const [isSelected, setSelected] = useState(false);

  return (
    <TagData
      text="Impressions"
      size="lg"
      selected={isSelected}
      onTap={() => {
        setSelected(!isSelected);
      }}
    />
  );
}
