import React, { useState } from 'react';
import { Flex, IconCompact, SelectList } from 'gestalt';

export default function Example() {
  const compactIconsList = IconCompact.icons;
  const [selectedValue, setSelectedValue] = useState(compactIconsList[0]);

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex alignItems="center" direction="row" gap={4}>
        <SelectList
          id="select-list-example"
          onChange={({ value }) => {
            setSelectedValue(value);
          }}
        >
          {compactIconsList.map((value) => (
            <SelectList.Option key={value} label={value} value={value} />
          ))}
        </SelectList>

        <IconCompact accessibilityLabel="Add a new item" color="default" icon={selectedValue} />
      </Flex>
    </Flex>
  );
}
