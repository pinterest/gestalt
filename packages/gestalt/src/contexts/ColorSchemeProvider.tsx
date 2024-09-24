import { Context, createContext, ReactNode, useContext, useEffect, useState } from 'react';
import classnames from 'classnames';
import darkColorDesignTokens from 'gestalt-design-tokens/dist/json/classic/variables-dark.json';
import lightColorDesignTokens from 'gestalt-design-tokens/dist/json/classic/variables-light.json';
import vrDarkColorDesignTokens from 'gestalt-design-tokens/dist/json/vr-theme-web-mapping/variables-dark.json';
import vrCkLineHeightDesignTokens from 'gestalt-design-tokens/dist/json/vr-theme-web-mapping/variables-font-lineheight-ck.json';
import vrDefaultLineHeightDesignTokens from 'gestalt-design-tokens/dist/json/vr-theme-web-mapping/variables-font-lineheight-default.json';
import vrJaLineHeightDesignTokens from 'gestalt-design-tokens/dist/json/vr-theme-web-mapping/variables-font-lineheight-ja.json';
import vrTallLineHeightDesignTokens from 'gestalt-design-tokens/dist/json/vr-theme-web-mapping/variables-font-lineheight-tall.json';
import vrThLineHeightDesignTokens from 'gestalt-design-tokens/dist/json/vr-theme-web-mapping/variables-font-lineheight-th.json';
import vrViLineHeightDesignTokens from 'gestalt-design-tokens/dist/json/vr-theme-web-mapping/variables-font-lineheight-vi.json';
import vrLightColorDesignTokens from 'gestalt-design-tokens/dist/json/vr-theme-web-mapping/variables-light.json';
import layoutStyles from '../Layout.css';
import useInExperiment from '../useInExperiment';

export type ColorScheme = 'light' | 'dark' | 'userPreference';

export type Theme = {
  colorSchemeName: 'lightMode' | 'darkMode';
  [tokenName: string]: string;
};

const lightModeTheme = {
  colorSchemeName: 'lightMode',
} as const;

const darkModeTheme = {
  colorSchemeName: 'darkMode',
} as const;

const ThemeContext: Context<Theme> = createContext<Theme>(lightModeTheme);

const getLanguageFile = (language?: 'default' | 'tall' | 'ck' | 'ja' | 'th' | 'vi') => {
  switch (language) {
    case 'ck':
      return vrCkLineHeightDesignTokens;
      break;
    case 'ja':
      return vrJaLineHeightDesignTokens;
      break;
    case 'tall':
      return vrTallLineHeightDesignTokens;
      break;
    case 'th':
      return vrThLineHeightDesignTokens;
      break;
    case 'vi':
      return vrViLineHeightDesignTokens;
      break;
    case 'default':
      return vrDefaultLineHeightDesignTokens;
      break;
    default:
      return vrDefaultLineHeightDesignTokens;
  }
};

/**
 * Appends tokens as injected CSS tokens
 */
const themeToStyles = (
  theme: { colorSchemeName: 'lightMode' | 'darkMode' },
  isVisualRefresh?: boolean,
  language?: 'default' | 'tall' | 'ck' | 'ja' | 'th' | 'vi',
) => {
  let styles = '';

  Object.keys(theme).forEach((key) => {
    styles += `  --gestalt-theme: ${isVisualRefresh ? 'visualRefresh' : 'classic'}-${
      // @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ colorSchemeName: "lightMode" | "darkMode"; }'.
      `${theme[key]}_lineHeight_${language}`
    };\n`;
  });

  if (theme.colorSchemeName === 'darkMode') {
    Object.keys(isVisualRefresh ? vrDarkColorDesignTokens : darkColorDesignTokens).forEach(
      (key) => {
        if (isVisualRefresh && key.match(/lineheight/)) {
          // @ts-expect-error - TS7053
          styles += `  --${key}: ${getLanguageFile(language)[key]};\n`;
        } else {
          styles += `  --${key}: ${
            // @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ "color-red-pushpin-0": string; "color-red-pushpin-50": string; "color-red-pushpin-100": string; "color-red-pushpin-200": string; "color-red-pushpin-300": string; "color-red-pushpin-400": string; ... 327 more ...; "elevation-datepicker": string; }'.
            (isVisualRefresh ? vrDarkColorDesignTokens : darkColorDesignTokens)[key]
          };\n`;
        }
      },
    );
  }
  if (theme.colorSchemeName === 'lightMode') {
    Object.keys(isVisualRefresh ? vrLightColorDesignTokens : lightColorDesignTokens).forEach(
      (key) => {
        if (isVisualRefresh && key.match(/lineheight/)) {
          // @ts-expect-error - TS7053
          styles += `  --${key}: ${getLanguageFile(language)[key]};\n`;
        } else {
          styles += `  --${key}: ${
            // @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ "color-red-pushpin-0": string; "color-red-pushpin-50": string; "color-red-pushpin-100": string; "color-red-pushpin-200": string; "color-red-pushpin-300": string; "color-red-pushpin-400": string; ... 327 more ...; "elevation-datepicker": string; }'.
            (isVisualRefresh ? vrLightColorDesignTokens : lightColorDesignTokens)[key]
          };\n`;
        }
      },
    );
  }

  return styles;
};

const getTheme = (colorScheme?: ColorScheme | null) =>
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
  colorScheme?: ColorScheme;
  /**
   * Sets the dimensions of the outputted `<div>` to 100% width and height.
   */
  fullDimensions?: boolean;
  /**
   * Use with caution! Set an id in your provider to limit the scope of the provider to just the children. This should only be used for cases where you want to enable dark mode in delimited sections to examplify dark mode itself.
   * If not passed in, settings will be applied as globally as possible (ex. setting color scheme variables at :root). A global implementation is critical for displaying dark mode correctly: when dark mode is not set globally, [React Portal](https://react.dev/reference/react-dom/createPortal)-based components, mostly Popovers and Tooltips, will not render in dark mode. The main ColorSchemeProvider in your app should NOT have an id set.
   */
  id?: string | null | undefined;
  /**
   * Sets the line height for the selected language.
   */
  language?: 'default' | 'tall' | 'ck' | 'ja' | 'th' | 'vi';
};

/**
 * [ColorSchemeProvider](https://gestalt.pinterest.systems/web/utilities/colorschemeprovider) is an optional [React context provider](https://reactjs.org/docs/context.html#contextprovider) to enable dark mode.
 */
export default function ColorSchemeProvider({
  children,
  colorScheme = 'light',
  fullDimensions = false,
  id,
  language = 'default',
}: Props) {
  const [theme, setTheme] = useState(getTheme(colorScheme));
  const [languageLineHeight, setLanguageLineHeight] = useState(language);

  const className = id ? `__gestaltTheme${id}` : undefined;
  const selector = className ? `.${className}` : ':root';
  const isInExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });

  const handlePrefChange = (event: MediaQueryList) => {
    setTheme(getTheme(event.matches ? 'dark' : 'light'));
  };

  useEffect(() => {
    setTheme(getTheme(colorScheme));
    setLanguageLineHeight(language);
    if (colorScheme === 'userPreference' && window.matchMedia) {
      // @ts-expect-error - TS2345 - Argument of type '(event: MediaQueryList) => void' is not assignable to parameter of type '(this: MediaQueryList, ev: MediaQueryListEvent) => any'.
      window.matchMedia('(prefers-color-scheme: dark)').addListener(handlePrefChange);
      return () =>
        // @ts-expect-error - TS2345 - Argument of type '(event: MediaQueryList) => void' is not assignable to parameter of type '(this: MediaQueryList, ev: MediaQueryListEvent) => any'.
        window.matchMedia('(prefers-color-scheme: dark)').removeListener(handlePrefChange);
    }
    return undefined; // Flow doesn't like that only userPreference returns a clean up func
  }, [colorScheme, language]);

  return (
    <ThemeContext.Provider value={theme}>
      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html:
            colorScheme === 'userPreference'
              ? `@media(prefers-color-scheme: dark) {
  ${selector} {
${themeToStyles(darkModeTheme, isInExperiment, languageLineHeight)} }
}`
              : `${selector} {
${themeToStyles(theme, isInExperiment, languageLineHeight)} }`,
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
  colorSchemeName: 'lightMode' | 'darkMode';
} {
  const { colorSchemeName } = useContext(ThemeContext);
  return { colorSchemeName };
}
