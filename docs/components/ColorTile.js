// @flow strict
import { type Node } from 'react';
import { Box, Text, useColorScheme } from 'gestalt';
// $FlowExpectedError[untyped-import]
import tokens from 'gestalt-design-tokens/dist/json/variables.json';
// $FlowExpectedError[untyped-import]
import darkModeTokens from 'gestalt-design-tokens/dist/json/variables-dark.json';

type Props = {|
  fullTokenName: string,
  description: string,
  number?: number,
  textColor?: 'dark' | 'light' | 'default' | 'inverse',
|};

function ColorTile({ description, fullTokenName, number = 400, textColor }: Props): Node {
  const newTextColor = textColor || (number > 400 ? 'light' : 'dark');
  const borderNeeded = fullTokenName?.includes('white') || fullTokenName?.includes('inverse');
  const { name: colorSchemeName } = useColorScheme();

  return (
    <Box
      dangerouslySetInlineStyle={{
        __style: { backgroundColor: `var(--${fullTokenName})` },
      }}
      height={50}
      width={300}
      display="flex"
      alignItems="center"
      justifyContent="between"
      paddingX={2}
      borderStyle={borderNeeded ? 'lg' : 'none'}
    >
      <Text weight="bold" color={newTextColor}>
        {description}
      </Text>
      <Text color={newTextColor}>
        {colorSchemeName === 'darkMode' && darkModeTokens[fullTokenName]
          ? darkModeTokens[fullTokenName]?.toUpperCase()
          : tokens[fullTokenName]?.toUpperCase()}
      </Text>
    </Box>
  );
}
export default ColorTile;
