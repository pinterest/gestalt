// @flow strict
import { type Node, useState } from 'react';
import { Box, Module, Text, TextField } from 'gestalt';

export default function Example(): Node {
  const [value, setValue] = useState('');
  const moduleType = !value ? 'error' : 'info';
  const summaryInfo = !value ? 'Name is missing' : `Name: ${value}`;
  const iconAccessibilityLabel = !value ? 'This module contains an error' : undefined;

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Box column={12} maxWidth={800} padding={2}>
        <Module.Expandable
          accessibilityExpandLabel="Expand the module"
          accessibilityCollapseLabel="Collapse the module"
          id="ModuleExample "
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
