// @flow strict
import { type Node } from 'react';
import { Box, SelectList } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <SelectList id="selectlistexample10" label="Country" onChange={() => {}} size="lg">
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
