// @flow strict
import type { Context, Element, Node } from 'react';

import { useContext, useEffect, useState, createContext } from 'react';
import PropTypes from 'prop-types';

export type ColorScheme = 'light' | 'dark' | 'userPreference';

export const ColorSchemePropType: React$PropType$Primitive<ColorScheme> = PropTypes.oneOf([
  'light',
  'dark',
  'userPreference',
]);

type Theme = {|
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
|};

type Props = {|
  children: Node,
  colorScheme?: ColorScheme,
  id?: ?string,
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

const ThemeContext: Context<Theme> = createContext<Theme>(lightModeTheme);

const themeToStyles = (theme) => {
  let styles = '';
  Object.keys(theme).forEach((key) => {
    if (key.startsWith('color')) {
      styles += `  --g-${key}: ${theme[key]};\n`;
    }
  });
  return styles;
};

const getTheme = (colorScheme: ?ColorScheme, parentalTheme: ColorScheme) =>
  colorScheme === 'dark' ||
  (colorScheme === 'userPreference' &&
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches) ||
  parentalTheme === darkModeTheme
    ? darkModeTheme
    : lightModeTheme;

export function useColorScheme(): Theme {
  const theme = useContext(ThemeContext);
  return theme || lightModeTheme;
}

export function ColorSchemeProvider({
  children,
  colorScheme,
  id,
}: Props): Element<typeof ThemeContext.Provider> {
  const [theme, setTheme] = useState(getTheme(colorScheme));
  const className = id ? `__gestaltTheme${id}` : undefined;
  const selector = className ? `.${className}` : ':root';
  const handlePrefChange = (e) => {
    setTheme(getTheme(e.matches ? 'dark' : 'light'));
  };

  const parentalTheme = useColorScheme();

  useEffect(() => {
    setTheme(getTheme(colorScheme, parentalTheme));
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
      <div className={className}>{children}</div>
    </ThemeContext.Provider>
  );
}

ColorSchemeProvider.propTypes = {
  children: PropTypes.node,
  colorScheme: ColorSchemePropType,
};
