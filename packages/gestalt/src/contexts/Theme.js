// @flow strict
import * as React from 'react';
import PropTypes from 'prop-types';

export type ColorScheme = 'light' | 'dark' | 'userPreference';

export const ColorSchemePropType: React$PropType$Primitive<ColorScheme> = PropTypes.oneOf(
  ['light', 'dark', 'userPreference']
);

type Theme = {|
  name: string,
  colorRed0: string,
  colorRed100: string,
  colorGray0: string,
  colorGray50: string,
  colorGray100: string,
  colorGray200: string,
  colorGray300: string,
  colorGray400: string,
|};

type Props = {|
  children: React.Node,
  colorScheme?: ColorScheme,
  id?: ?string,
|};

const lightModeTheme = {
  name: 'lightMode',
  colorRed0: '#ff5247',
  colorRed100: '#e60023',
  colorGray0: '#fff',
  colorGray50: '#fff',
  colorGray100: '#efefef',
  colorGray200: '#767676',
  colorGray300: '#111',
  colorGray400: '#000',
};

const darkModeTheme = {
  name: 'darkMode',
  colorRed0: '#e60023',
  colorRed100: '#ff5247',
  colorGray0: '#050505',
  colorGray50: '#272727',
  colorGray100: '#494949',
  colorGray200: '#b8b8b8',
  colorGray300: '#efefef',
  colorGray400: '#fff',
};

const ThemeContext: React.Context<Theme> = React.createContext<Theme>(
  lightModeTheme
);

const themeToStyles = theme => {
  let styles = '';
  Object.keys(theme).forEach(key => {
    if (key.startsWith('color')) {
      styles += `  --gestalt-${key}: ${theme[key]};\n`;
    }
  });
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

export function ThemeProvider({
  children,
  colorScheme,
  id,
}: Props): React.Element<typeof ThemeContext.Provider> {
  const [theme, setTheme] = React.useState(getTheme(colorScheme));
  const className = id ? `__gestaltTheme${id}` : undefined;
  const selector = className ? `.${className}` : ':root';
  const handlePrefChange = e => {
    setTheme(getTheme(e.matches ? 'dark' : 'light'));
  };
  React.useEffect(() => {
    setTheme(getTheme(colorScheme));
    if (colorScheme === 'userPreference' && window.matchMedia) {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addListener(handlePrefChange);
      return () =>
        window
          .matchMedia('(prefers-color-scheme: dark)')
          .removeListener(handlePrefChange);
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

ThemeProvider.propTypes = {
  children: PropTypes.node,
  colorScheme: ColorSchemePropType,
};

export function useTheme(): Theme {
  const theme = React.useContext(ThemeContext);
  return theme || lightModeTheme;
}
