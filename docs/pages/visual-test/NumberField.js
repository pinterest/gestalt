// @flow strict
import { type Node } from 'react';
import { NumberField, Box } from 'gestalt';

export default function Screenshot(): Node {
  return (
    <Box color="default" display="inlineBlock" padding={1}>
      <NumberField
        id="variant-helperText"
        helperText="Round up to the nearest whole number"
        label="Average value"
        onChange={() => {}}
        value={5}
      />
    </Box>
  );
}
