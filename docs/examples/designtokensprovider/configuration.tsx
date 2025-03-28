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
  const [theme, setTheme] = useState<'classic' | 'visualrefresh' | 'calico01' | undefined>(
    undefined,
  );

  return (
    <Box height="100%" width="100%">
      <ColorSchemeProvider colorScheme={scheme}>
        <DesignTokensProvider forceTheme={theme} id="docsExample">
          <Box color="default" padding={2}>
            <Flex direction="column" gap={8}>
              <SelectList
                id="scheme"
                label="Color scheme"
                name="scheme"
                // @ts-expect-error - TS2345
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
              <SelectList
                id="theme"
                label="Theme"
                name="theme"
                // @ts-expect-error - TS2345
                onChange={({ value }) => setTheme(value)}
                placeholder="Select theme"
                value={theme}
              >
                {[
                  { value: 'classic', label: 'Classic' },
                  { value: 'visualrefresh', label: 'Visual refresh' },
                  { value: 'calico01', label: 'Calico' },
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
    </Box>
  );
}
