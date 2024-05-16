import {ReactNode, useState} from 'react';
import { Box, Flex, NumberField, TextArea } from 'gestalt';

export default function Example() {
  const [value, setValue] = useState('');
  const [rows, setRows] = useState(2);

  return (
    <Box display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex direction="column" gap={4} width="100%">
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
          rows={rows}
          value={value}
        />
      </Flex>
    </Box>
  );
}
