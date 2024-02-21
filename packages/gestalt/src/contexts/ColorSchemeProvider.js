// @flow strict
import {
  type Context,
  createContext,
  type Element,
  type Node as ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import classnames from 'classnames';
import darkColorDesignTokens from 'gestalt-design-tokens/dist/json/variables-dark.json';
import lightColorDesignTokens from 'gestalt-design-tokens/dist/json/variables-light.json';
import layoutStyles from '../Layout.css';

export type ColorScheme = 'light' | 'dark' | 'userPreference';

export type Theme = {
  colorSchemeName: 'lightMode' | 'darkMode',
  colorGray300: string,
  [tokenName: string]: string,
};

const lightModeTheme = {
  colorSchemeName: 'lightMode',
  colorGray300: '#111',
};

const darkModeTheme = {
  colorSchemeName: 'darkMode',
  colorGray300: '#efefef',
};

const ThemeContext: Context<Theme> = createContext<Theme>(lightModeTheme);

/**
 * Appends tokens as injected CSS tokens
 */
const themeToStyles = (theme: {
  colorGray300: string,
  colorSchemeName: 'lightMode' | 'darkMode',
}) => {
  let styles = '';
  Object.keys(theme).forEach((key) => {
    if (key.startsWith('color')) {
      styles += `  --g-${key}: ${theme[key]};\n`;
    }
  });
  if (theme.colorSchemeName === 'darkMode') {
    Object.keys(darkColorDesignTokens).forEach((key) => {
      styles += `  --${key}: ${darkColorDesignTokens[key]};\n`;
    });
  }
  if (theme.colorSchemeName === 'lightMode') {
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

type Props = {
  /**
   * Context lets a parent component provide data to the entire tree below it. Only components within the ColorSchemeProvider tree will be able to subscribe to it.
   */
  children: ReactNode,
  /**
   * The color scheme for components inside the ColorSchemeProvider. Use 'userPreference' to allow the end user to specify the color scheme via their browser settings, using the 'prefers-color-scheme' media query. See [color scheme](https://gestalt.pinterest.systems/web/utilities/colorschemeprovider#Color-scheme) variant for examples.
   */
  colorScheme?: ColorScheme,
  /**
   * Sets the dimensions of the outputted `<div>` to 100% width and height.
   */
  fullDimensions?: boolean,
  /**
   * Use with caution! Set an id in your provider to limit the scope of the provider to just the children. This should only be used for cases where you want to enable dark mode in delimited sections to examplify dark mode itself.
   * If not passed in, settings will be applied as globally as possible (ex. setting color scheme variables at :root). A global implementation is critical for displaying dark mode correctly: when dark mode is not set globally, [React Portal](https://react.dev/reference/react-dom/createPortal)-based components, mostly Popovers and Tooltips, will not render in dark mode. The main ColorSchemeProvider in your app should NOT have an id set.
   */
  id?: ?string,
};

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

export function useColorScheme(): {
  colorSchemeName: 'lightMode' | 'darkMode',
} {
  const { colorSchemeName } = useContext(ThemeContext);
  return { colorSchemeName };
}
