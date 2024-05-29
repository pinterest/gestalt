import darkColorDesignTokens from 'gestalt-design-tokens/dist/json/classic/variables-dark.json';
import lightColorDesignTokens from 'gestalt-design-tokens/dist/json/classic/variables-light.json';

/** Gets the relevant dataviz color from a code. We use the color hex to generate a shade. Data visualization colors are a part of theme tokens */
export default function getDataVisualizationColor(
  theme: 'lightMode' | 'darkMode',
  vizColor: string,
  opts?: {
    lighten?: boolean;
  },
): string {
  const hex =
    theme === 'lightMode'
      ? // @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type '`color-data-visualization-${string}`' can't be used to index type '{ "color-red-pushpin-0": string; "color-red-pushpin-50": string; "color-red-pushpin-100": string; "color-red-pushpin-200": string; "color-red-pushpin-300": string; "color-red-pushpin-400": string; ... 327 more ...; "elevation-datepicker": string; }'.
        lightColorDesignTokens[`color-data-visualization-${vizColor}`]
      : // @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type '`color-data-visualization-${string}`' can't be used to index type '{ "color-red-pushpin-0": string; "color-red-pushpin-50": string; "color-red-pushpin-100": string; "color-red-pushpin-200": string; "color-red-pushpin-300": string; "color-red-pushpin-400": string; ... 327 more ...; "elevation-datepicker": string; }'.
        darkColorDesignTokens[`color-data-visualization-${vizColor}`];
  if (!hex) throw new Error('Invalid Color Token provided to TileData');
  // add an alpha channel to the hex, at 10% opacity
  // https://gist.github.com/lopspower/03fb1cc0ac9f32ef38f4
  return opts?.lighten ? `${hex}1A` : hex;
}
