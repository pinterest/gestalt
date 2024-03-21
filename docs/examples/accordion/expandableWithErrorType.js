// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Accordion, Box, Text, TextField } from 'gestalt';

export default function Example(): ReactNode {
  const [value, setValue] = useState('');
  const moduleType = !value ? 'error' : 'info';
  const summaryInfo = !value ? 'Name is missing' : `Name: ${value}`;
  const iconAccessibilityLabel = !value ? 'This accordion contains an error' : undefined;

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Box column={12} maxWidth={800} padding={2}>
        <Accordion.Expandable
          id="accordionExample"
          items={[
            {
              children: (
                <Text size="200">
                  <TextField
                    errorMessage={!value ? "This field can't be blank!" : null}
                    id="aboutme"
                    label="Enter Your Name"
                    onChange={(e) => setValue(e.value)}
                    value={value}
                  />
                </Text>
              ),
              iconAccessibilityLabel,
              summary: [summaryInfo],
              title: 'Personal Info',
              type: moduleType,
            },
          ]}
        />
      </Box>
    </Box>
  );
}
