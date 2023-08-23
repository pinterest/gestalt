// @flow strict
import { type Node, useState } from 'react';
import { Box, Flex, NumberField, TextArea } from 'gestalt';

export default function Example(): Node {
  const [value, setValue] = useState('');
  const [rows, setRows] = useState(2);

  return (
    <Box padding={8} height="100%" display="flex" justifyContent="center">
      <Flex direction="column" width="100%" gap={4}>
        <Box width={120}>
          <NumberField
            id="numberfield_rows"
            label="Number of Rows"
            onChange={(data) => {
              if (data.value) setRows(data.value);
            }}
            value={rows}
          />
        </Box>
        <TextArea
          id="rows"
          label="Rows example"
          onChange={(data) => {
            setValue(data.value);
          }}
          placeholder={`this text area has ${rows} rows`}
          value={value}
          rows={rows}
        />
      </Flex>
    </Box>
  );
}
