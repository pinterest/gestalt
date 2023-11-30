// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Box, Button, ButtonGroup, ColorSchemeProvider, Flex, SelectList, Text } from 'gestalt';

export default function Example(): ReactNode {
  const [scheme, setScheme] = useState<'light' | 'dark' | 'userPreference'>('light');

  return (
    <Flex alignItems="center" gap={4} height="100%" justifyContent="center" width="100%">
      <ColorSchemeProvider colorScheme={scheme} id="docsExample">
        <Box color="default" padding={2}>
          <Flex direction="column" gap={8}>
            <SelectList
              id="scheme"
              name="scheme"
              // $FlowFixMe[incompatible-call]
              onChange={({ value }) => setScheme(value)}
              placeholder="Select color scheme"
              label="Color scheme"
              value={scheme}
            >
              {[
                { value: 'light', label: 'Light' },
                { value: 'dark', label: 'Dark' },
                { value: 'userPreference', label: 'User Preference' },
              ].map(({ label, value }) => (
                <SelectList.Option key={label} label={label} value={value} />
              ))}
            </SelectList>

            <Flex direction="column" gap={2}>
              <Text>Some content</Text>
              <ButtonGroup>
                <Button text="Example button" />
                <Button color="red" text="Red Button" />
              </ButtonGroup>
            </Flex>
          </Flex>
        </Box>
      </ColorSchemeProvider>
    </Flex>
  );
}
