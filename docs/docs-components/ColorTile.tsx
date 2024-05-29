import { Box, Text, useColorScheme } from 'gestalt';
import { TOKEN_COLOR_TRANSPARENT } from 'gestalt-design-tokens';
import tokens from 'gestalt-design-tokens/dist/json/classic/variables.json';
import darkModeTokens from 'gestalt-design-tokens/dist/json/classic/variables-dark.json';

type Props = {
  token: string | null | undefined;
  description: string;
  number?: number;
  textColor?: 'dark' | 'light' | 'default' | 'inverse';
};

function ColorTile({ description, token, number = 400, textColor }: Props) {
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
        {/* @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ "color-red-pushpin-0": string; "color-red-pushpin-50": string; "color-red-pushpin-100": string; "color-red-pushpin-200": string; "color-red-pushpin-300": string; "color-red-pushpin-400": string; ... 327 more ...; "elevation-datepicker": string; }'. */}
        {colorSchemeName === 'darkMode' && tokenName && darkModeTokens[tokenName]
          ? // @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ "color-red-pushpin-0": string; "color-red-pushpin-50": string; "color-red-pushpin-100": string; "color-red-pushpin-200": string; "color-red-pushpin-300": string; "color-red-pushpin-400": string; ... 327 more ...; "elevation-datepicker": string; }'.
            darkModeTokens[tokenName]?.toUpperCase()
          : // @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ "color-red-pushpin-0": string; "color-red-pushpin-50": string; "color-red-pushpin-100": string; "color-red-pushpin-200": string; "color-red-pushpin-300": string; "color-red-pushpin-400": string; ... 393 more ...; "space-negative-1600": string; }'.
            tokenName && tokens[tokenName]?.toUpperCase()}
      </Text>
    </Box>
  );
}
export default ColorTile;
