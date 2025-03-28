import { useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  ColorSchemeProvider,
  DesignTokensProvider,
  Flex,
  SelectList,
  Text,
} from 'gestalt';

export default function Example() {
  const [scheme, setScheme] = useState<'light' | 'dark' | 'userPreference'>('light');

  return (
    <Flex alignItems="center" gap={4} height="100%" justifyContent="center" width="100%">
      <ColorSchemeProvider colorScheme={scheme}>
        <DesignTokensProvider id="docsExample">
          <Box color="default" padding={2}>
            <Flex direction="column" gap={8}>
              <SelectList
                id="scheme"
                label="Color scheme"
                name="scheme"
                // @ts-expect-error - TS2345 - Argument of type 'string' is not assignable to parameter of type 'SetStateAction<"light" | "dark" | "userPreference">'.
                onChange={({ value }) => setScheme(value)}
                placeholder="Select color scheme"
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
        </DesignTokensProvider>
      </ColorSchemeProvider>
    </Flex>
  );
}
