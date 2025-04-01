import { useEffect, useState } from 'react';
import { Box, ColorSchemeProvider, DesignTokensProvider, Flex, SelectList, Text } from 'gestalt';

export default function Example() {
  const [scheme, setScheme] = useState<'light' | 'dark' | 'userPreference'>('light');
  const [text, setText] = useState<string>('');

  const [theme, setTheme] = useState<'classic' | 'visualrefresh' | 'calico01' | undefined>(
    'classic',
  );

  useEffect(() => {
    setText((document && document.getElementById('locator')?.innerHTML.slice(0, 250)) ?? '');
  }, [scheme, theme]);

  return (
    <Flex direction="column" gap={12} height="100%" width="100%">
      <Flex gap={2}>
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
      </Flex>
      <div id="locator">
        <ColorSchemeProvider colorScheme={scheme}>
          <DesignTokensProvider forceTheme={theme} id="Example">
            <Box padding={2}>
              <Text color="inverse" lineClamp={2}>
                <span style={{ color: 'black' }}>{text} </span>
              </Text>
            </Box>
          </DesignTokensProvider>
        </ColorSchemeProvider>
      </div>
    </Flex>
  );
}
