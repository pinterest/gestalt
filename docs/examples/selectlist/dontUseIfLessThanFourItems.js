// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, SelectList } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <SelectList id="selectlistexample5" label="Gender" onChange={() => {}} size="lg">
        {[
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' },
          { label: 'Non-binary', value: 'nonbinary' },
        ].map(({ label, value }) => (
          <SelectList.Option key={label} label={label} value={value} />
        ))}
      </SelectList>
    </Box>
  );
}
