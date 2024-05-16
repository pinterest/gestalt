import {ReactNode} from 'react';
import { Box, Text, useColorScheme } from 'gestalt';
import { TOKEN_COLOR_TRANSPARENT } from 'gestalt-design-tokens';
import tokens from 'gestalt-design-tokens/dist/json/variables.json';
import darkModeTokens from 'gestalt-design-tokens/dist/json/variables-dark.json';

type Props = {
  token: string | null | undefined,
  description: string,
  number?: number,
  textColor?: "dark" | "light" | "default" | "inverse"
};

function ColorTile(
  {
    description,
    token,
    number = 400,
    textColor,
  }: Props,
) {
  const isTransparent = token === TOKEN_COLOR_TRANSPARENT;
  const newTextColor = textColor || (number > 400 ? 'light' : 'dark');
  const borderNeeded =
    token?.includes('white') ||
    token?.includes('black') ||
    token?.includes('inverse') ||
    isTransparent;
  const { colorSchemeName } = useColorScheme();

  const regex = /(?<=--)(.*?)(?=\))/g;
  const tokenName = token?.match(regex)?.[0];
  return (
    <Box
      alignItems="center"
      borderStyle={borderNeeded ? 'lg' : 'none'}
      dangerouslySetInlineStyle={{
        __style: token ? { backgroundColor: token } : {},
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
        {colorSchemeName === 'darkMode' && tokenName && darkModeTokens[tokenName]
          ? darkModeTokens[tokenName]?.toUpperCase()
          : tokenName && tokens[tokenName]?.toUpperCase()}
      </Text>
    </Box>
  );
}
export default ColorTile;
