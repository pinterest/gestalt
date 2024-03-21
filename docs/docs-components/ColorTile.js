// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Text, useColorScheme } from 'gestalt';
import tokens from 'gestalt-design-tokens/dist/json/variables.json';
import darkModeTokens from 'gestalt-design-tokens/dist/json/variables-dark.json';

type Props = {
  fullTokenName: string,
  description: string,
  number?: number,
  textColor?: 'dark' | 'light' | 'default' | 'inverse',
};

function ColorTile({ description, fullTokenName, number = 400, textColor }: Props): ReactNode {
  const isTransparent = fullTokenName === 'color-transparent';
  const newTextColor = textColor || (number > 400 ? 'light' : 'dark');
  const borderNeeded =
    fullTokenName?.includes('white') ||
    fullTokenName?.includes('black') ||
    fullTokenName?.includes('inverse') ||
    isTransparent;
  const { colorSchemeName } = useColorScheme();

  return (
    <Box
      alignItems="center"
      borderStyle={borderNeeded ? 'lg' : 'none'}
      dangerouslySetInlineStyle={{
        __style: { backgroundColor: `var(--${fullTokenName})` },
      }}
      display="flex"
      height={50}
      justifyContent="between"
      paddingX={2}
      width={300}
    >
      <Box marginEnd={3}>
        <Text color={newTextColor} weight="bold">
          {description}
        </Text>
      </Box>
      <Text color={newTextColor}>
        {colorSchemeName === 'darkMode' && darkModeTokens[fullTokenName]
          ? darkModeTokens[fullTokenName]?.toUpperCase()
          : tokens[fullTokenName]?.toUpperCase()}
      </Text>
    </Box>
  );
}
export default ColorTile;
