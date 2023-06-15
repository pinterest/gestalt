// @flow strict
import { type Node } from 'react';
import { Box, ColorSchemeProvider, SelectList } from 'gestalt';

export default function Screenshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" display="inlineBlock" padding={1}>
        <SelectList id="selectlistexample11" onChange={() => {}} size="md" label="Country">
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
        </SelectList>{' '}
      </Box>
    </ColorSchemeProvider>
  );
}
