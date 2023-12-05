// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Accordion, Box, Flex, Text, TextField } from 'gestalt';

export default function Example(): ReactNode {
  const [value, setValue] = useState('');

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Box column={12} maxWidth={800} padding={2}>
        <Accordion
          id="accordionExample - error"
          title="Personal Info"
          iconAccessibilityLabel={!value ? 'This accordion contains an error' : undefined}
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
