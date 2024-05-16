import {ReactNode, useState} from 'react';
import { Accordion, Box, Flex, Text, TextField } from 'gestalt';

export default function Example() {
  const [value, setValue] = useState('');

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Box column={12} maxWidth={800} padding={2}>
        <Accordion
          iconAccessibilityLabel={!value ? 'This accordion contains an error' : undefined}
          id="accordionExample - error"
          title="Personal Info"
          type={!value ? 'error' : 'info'}
        >
          <Flex direction="column" gap={{ column: 4, row: 0 }}>
            <Text size="200">This is example content.</Text>

            <TextField
              errorMessage={!value ? "This field can't be blank!" : null}
              id="first-name"
              label="Enter Your Name"
              onChange={(e) => setValue(e.value)}
              value={value}
            />
          </Flex>
        </Accordion>
      </Box>
    </Box>
  );
}
