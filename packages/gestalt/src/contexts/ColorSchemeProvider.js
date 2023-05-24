// @flow strict
import {
  createContext,
  type Context,
  type Element,
  type Node,
  useContext,
  useEffect,
  useState,
} from 'react';
import classnames from 'classnames';
import darkColorDesignTokens from 'gestalt-design-tokens/dist/json/variables-dark.json';
import lightColorDesignTokens from 'gestalt-design-tokens/dist/json/variables-light.json';
import layoutStyles from '../Layout.css';

export type ColorScheme = 'light' | 'dark' | 'userPreference';

export type Theme = {|
  name: string,
  colorRed0: string,
  colorRed100: string,
  colorRed100Active: string,
  colorRed100Hovered: string,
  colorGray0: string,
  colorGray0Active: string,
  colorGray0Hovered: string,
  colorGray50: string,
  colorGray100: string,
  colorGray100Active: string,
  colorGray100Hovered: string,
  colorGray150: string,
  colorGray150Hovered: string,
  colorGray200: string,
  colorGray200Active: string,
  colorGray200Hovered: string,
  colorGray300: string,
  colorGray400: string,
  colorTransparentDarkGray: string,
  colorTransparentGray60: string,
  colorTransparentGray100: string,
  colorTransparentGray500: string,
  colorTransparentWhite: string,
  blueHovered: string,
  blueActive: string,
  [tokenName: string]: string,
|};

const lightModeTheme = {
  name: 'lightMode',
  colorRed0: '#ff5247',
  colorRed100: '#e60023',
  colorRed100Active: '#a3081a',
  colorRed100Hovered: '#ad081b',
  colorGray0: '#fff',
  colorGray0Active: '#e0e0e0',
  colorGray0Hovered: '#f0f0f0',
  colorGray50: '#fff',
  colorGray100: '#efefef',
  colorGray100Active: '#dadada',
  colorGray100Hovered: '#e2e2e2',
  colorGray150: '#ddd',
  colorGray150Hovered: '#d0d0d0',
  colorGray200: '#767676',
  colorGray200Active: '#828282',
  colorGray200Hovered: '#878787',
  colorGray300: '#111',
  colorGray400: '#000',
  colorTransparentDarkGray: 'rgba(51, 51, 51, 0.8)',
  colorTransparentGray60: 'rgba(0, 0, 0, 0.06)',
  colorTransparentGray100: 'rgba(0, 0, 0, 0.1)',
  colorTransparentGray500: 'rgba(0, 0, 0, 0.1)',
  colorTransparentWhite: 'rgba(255, 255, 255, 0.8)',
  blueHovered: '#4a8ad4',
  blueActive: '#4a85c9',
};

const darkModeTheme = {
  name: 'darkMode',
  colorRed0: '#e60023',
  colorRed100: '#ff5247',
  colorRed100Active: '#b8001b',
  colorRed100Hovered: '#cf001f',
  colorGray0: '#030303',
  colorGray0Active: '#1f1f1f',
  colorGray0Hovered: '#121212',
  colorGray50: '#212121',
  colorGray100: '#404040',
  colorGray100Active: '#666',
  colorGray100Hovered: '#535353',
  colorGray150: '#585858',
  colorGray150Hovered: '#535353',
  colorGray200: '#ababab',
  colorGray200Active: '#9b9b9b',
  colorGray200Hovered: '#919191',
  colorGray300: '#efefef',
  colorGray400: '#fff',
  colorTransparentDarkGray: 'rgba(255, 255, 255, 0.8)',
  colorTransparentGray60: 'rgba(250, 250, 250, 0.5)',
  colorTransparentGray100: 'rgba(250, 250, 250, 0.6)',
  colorTransparentGray500: 'rgba(0, 0, 0, 0.5)',
  colorTransparentWhite: 'rgba(51, 51, 51, 0.8)',
  blueHovered: '#4a8ad4',
  blueActive: '#4a85c9',
};

/**
 * Turns a token name like color-text-warning to colorTextWarning
 */
const transformKebabToCamelCase = (tokenName: string): string => {
  const split = tokenName.split('-');
  return split
    .map((w, idx) => {
      if (idx === 0) return w;
      const capitalized = w.charAt(0).toUpperCase() + w.slice(1);
      return capitalized;
    })
    .join('');
};

/**
 * Appends additional tokens from the Gestalt Tokens Library to the context
 */
const addTokensToThemes = () => {
  // For now, add only the Data Visualization Tokens to the themes
  const isDataVisualizationToken = (key: string) => key.toLowerCase().includes('data');
  Object.keys(darkColorDesignTokens).forEach((key) => {
    if (isDataVisualizationToken(key))
      (darkModeTheme: Theme)[transformKebabToCamelCase(key)] = darkColorDesignTokens[key];
  });

  Object.keys(lightColorDesignTokens).forEach((key) => {
    if (isDataVisualizationToken(key))
      (lightModeTheme: Theme)[transformKebabToCamelCase(key)] = lightColorDesignTokens[key];
  });
};

// runs once, statically appends more tokens to our JSON themes
addTokensToThemes();

const ThemeContext: Context<Theme> = createContext<Theme>(lightModeTheme);

/**
 * Appends tokens as injected CSS tokens
 */
const themeToStyles = (theme: {|
  blueActive: string,
  blueHovered: string,
  colorGray0: string,
  colorGray0Active: string,
  colorGray0Hovered: string,
  colorGray100: string,
  colorGray100Active: string,
  colorGray100Hovered: string,
  colorGray150: string,
  colorGray150Hovered: string,
  colorGray200: string,
  colorGray200Active: string,
  colorGray200Hovered: string,
  colorGray300: string,
  colorGray400: string,
  colorGray50: string,
  colorRed0: string,
  colorRed100: string,
  colorRed100Active: string,
  colorRed100Hovered: string,
  colorTransparentDarkGray: string,
  colorTransparentGray100: string,
  colorTransparentGray500: string,
  colorTransparentGray60: string,
  colorTransparentWhite: string,
  name: string,
|}) => {
  let styles = '';
  Object.keys(theme).forEach((key) => {
    if (key.startsWith('color')) {
      styles += `  --g-${key}: ${theme[key]};\n`;
    }
  });
  if (theme.name === 'darkMode') {
    Object.keys(darkColorDesignTokens).forEach((key) => {
      styles += `  --${key}: ${darkColorDesignTokens[key]};\n`;
    });
  }
  if (theme.name === 'lightMode') {
    Object.keys(lightColorDesignTokens).forEach((key) => {
      styles += `  --${key}: ${lightColorDesignTokens[key]};\n`;
    });
  }

  return styles;
};

const getTheme = (colorScheme: ?ColorScheme) =>
  colorScheme === 'dark' ||
  (colorScheme === 'userPreference' &&
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches)
    ? darkModeTheme
    : lightModeTheme;

type Props = {|
  /**
   *
   */
  children: Node,
  /**
   * The color scheme for components inside the ColorSchemeProvider. Use 'userPreference' to allow the end user to specify the color scheme via their browser settings, using the 'prefers-color-scheme' media query. See [color scheme](https://gestalt.pinterest.systems/web/utilities/colorschemeprovider#Color-scheme) variant for examples.
   */
  colorScheme?: ColorScheme,
  /**
   * Sets the dimensions of the outputted `<div>` to 100% width and height.
   */
  fullDimensions?: boolean,
  /**
   * An optional id for your color scheme provider. If not passed in, settings will be applied as globally as possible (ex. setting color scheme variables at :root).
   */
  id?: ?string,
|};

/**
 * [ColorSchemeProvider](https://gestalt.pinterest.systems/web/utilities/colorschemeprovider) is an optional [React context provider](https://reactjs.org/docs/context.html#contextprovider) to enable dark mode.
 */
export default function ColorSchemeProvider({
  children,
  colorScheme = 'light',
  fullDimensions = false,
  id,
}: Props): Element<typeof ThemeContext.Provider> {
  const [theme, setTheme] = useState(getTheme(colorScheme));
  const className = id ? `__gestaltTheme${id}` : undefined;
  const selector = className ? `.${className}` : ':root';

  const handlePrefChange = (event: MediaQueryList) => {
    setTheme(getTheme(event.matches ? 'dark' : 'light'));
  };

  useEffect(() => {
    setTheme(getTheme(colorScheme));
    if (colorScheme === 'userPreference' && window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addListener(handlePrefChange);
      return () =>
        window.matchMedia('(prefers-color-scheme: dark)').removeListener(handlePrefChange);
    }
    return undefined; // Flow doesn't like that only userPreference returns a clean up func
  }, [colorScheme]);

  return (
    <ThemeContext.Provider value={theme}>
      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html:
            colorScheme === 'userPreference'
              ? `@media(prefers-color-scheme: dark) {
  ${selector} {
${themeToStyles(darkModeTheme)} }
}`
              : `${selector} {
${themeToStyles(theme)} }`,
        }}
      />
      <div
        className={classnames(className, {
          [layoutStyles.fullHeight]: fullDimensions,
          [layoutStyles.fullWidth]: fullDimensions,
        })}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useColorScheme(): Theme {
  const theme = useContext(ThemeContext);
  return theme || lightModeTheme;
}
