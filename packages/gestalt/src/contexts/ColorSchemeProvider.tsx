import { Context, createContext, ReactNode, useContext, useEffect, useState } from 'react';

type ColorSchemeType = 'light' | 'dark' | 'userPreference';

type ThemeType = {
  colorSchemeName: 'lightMode' | 'darkMode';
  [tokenName: string]: string;
};

const lightModeTheme = {
  colorSchemeName: 'lightMode',
} as const;

const darkModeTheme = {
  colorSchemeName: 'darkMode',
} as const;

const ThemeContext: Context<ThemeType> = createContext<ThemeType>(lightModeTheme);

const getColorTheme = (colorScheme?: ColorSchemeType | null) =>
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
  children: ReactNode;
  /**
   * The color scheme for components inside the ColorSchemeProvider. Use 'userPreference' to allow the end user to specify the color scheme via their browser settings, using the 'prefers-color-scheme' media query. See [color scheme](https://gestalt.pinterest.systems/web/utilities/colorschemeprovider#Color-scheme) variant for examples.
   */
  colorScheme?: ColorSchemeType;
};

/**
 * [DesignTokenProvider](https://gestalt.pinterest.systems/web/utilities/designtokenprovider).
 */
export default function ColorSchemeProvider({ children, colorScheme = 'light' }: Props) {
  const [theme, setTheme] = useState(getColorTheme(colorScheme));

  const handlePrefChange = (event: MediaQueryList) => {
    setTheme(getColorTheme(event.matches ? 'dark' : 'light'));
  };

  useEffect(() => {
    setTheme(getColorTheme(colorScheme));

    if (colorScheme === 'userPreference' && window.matchMedia) {
      // @ts-expect-error - TS2345 - Argument of type '(event: MediaQueryList) => void' is not assignable to parameter of type '(this: MediaQueryList, ev: MediaQueryListEvent) => any'.
      window.matchMedia('(prefers-color-scheme: dark)').addListener(handlePrefChange);
      return () =>
        // @ts-expect-error - TS2345 - Argument of type '(event: MediaQueryList) => void' is not assignable to parameter of type '(this: MediaQueryList, ev: MediaQueryListEvent) => any'.
        window.matchMedia('(prefers-color-scheme: dark)').removeListener(handlePrefChange);
    }
    return undefined; // Flow doesn't like that only userPreference returns a clean up func
  }, [colorScheme]);

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export function useColorScheme(): {
  colorSchemeName: 'lightMode' | 'darkMode';
} {
  const { colorSchemeName } = useContext(ThemeContext);
  return { colorSchemeName };
}
