// @flow strict
import { type Node } from 'react';
import { Box, SelectList } from 'gestalt';

export default function Example(): Node {
  return (
    <Box width="100%" height="100%" padding={4}>
      <SelectList id="selectlistexample1" label="Country" onChange={() => {}} size="lg">
        {[
          { label: 'Algeria', value: 'algeria' },
          { label: 'Belgium', value: 'belgium' },
          { label: 'Canada', value: 'canada' },
          { label: 'Denmark', value: 'denmark' },
          { label: 'Egypt', value: 'egypt' },
          { label: 'France', value: 'france' },
        ].map(({ label, value }) => (
          <SelectList.Option key={label} label={label} value={value} />
        ))}
      </SelectList>
    </Box>
  );
}
