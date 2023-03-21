import type { Context, Element, Node } from 'react';
export type ColorScheme = 'light' | 'dark' | 'userPreference';
type Theme = {
  name: string;
  colorRed0: string;
  colorRed100: string;
  colorRed100Active: string;
  colorRed100Hovered: string;
  colorGray0: string;
  colorGray0Active: string;
  colorGray0Hovered: string;
  colorGray50: string;
  colorGray100: string;
  colorGray100Active: string;
  colorGray100Hovered: string;
  colorGray150: string;
  colorGray150Hovered: string;
  colorGray200: string;
  colorGray200Active: string;
  colorGray200Hovered: string;
  colorGray300: string;
  colorGray400: string;
  colorTransparentDarkGray: string;
  colorTransparentGray60: string;
  colorTransparentGray100: string;
  colorTransparentGray500: string;
  colorTransparentWhite: string;
  blueHovered: string;
  blueActive: string;
};
declare const ThemeContext: Context<Theme>;
type Props = {
  /**
   *
   */
  children: Node;
  /**
   * The color scheme for components inside the ColorSchemeProvider. Use 'userPreference' to allow the end user to specify the color scheme via their browser settings, using the 'prefers-color-scheme' media query. See [color scheme](https://gestalt.pinterest.systems/web/utilities/colorschemeprovider#Color-scheme) variant for examples.
   */
  colorScheme?: ColorScheme;
  /**
   * An optional id for your color scheme provider. If not passed in, settings will be applied as globally as possible (ex. setting color scheme variables at :root).
   */
  id?: string | null | undefined;
};
/**
 * [ColorSchemeProvider](https://gestalt.pinterest.systems/web/utilities/colorschemeprovider) is an optional [React context provider](https://reactjs.org/docs/context.html#contextprovider) to enable dark mode.
 */
export default function ColorSchemeProvider({
  children,
  colorScheme,
  id,
}: Props): Element<typeof ThemeContext.Provider>;
export declare function useColorScheme(): Theme;
export {};
