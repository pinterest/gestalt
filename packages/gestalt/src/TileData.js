// @flow strict
import { type Node } from 'react';
import styles from './TileData.css';
import Box from './Box.js';
import Tile from './Tile/Tile.js';
import DataPoint from './Datapoint';
import generateColorShade from './utils/generateColorShade';
import designTokens from 'gestalt-design-tokens/dist/json/variables.json';

type DataVisualizationColors =
  | 'data-visualization-1'
  | 'data-visualization-2'
  | 'data-visualization-3'
  | 'data-visualization-4';

type Props = {|
  /**
   * Prop description.
   */
  accessibilityLabel?: string,
  /**
   * A color from the data visualization palette. if it's not in the pallete
   */
  selectedColor?: DataVisualizationColors,
  /**
   * An identifier to be passed in a callback, and distinguish multiple DataPoints
   */
  id?: string,
  /**
   * Controls whether the tile is selected or not
   */
  selected?: boolean,
  /**
   * disables interactii
   */
  disabled?: boolean,
  /**
   * Adds a Tooltip on hover/focus of the Tile. See the With Tooltip variant to learn more.
   */
  tooltip?: boolean,
  /**
   * Shows a checkbox. Useful when multi-select is available
   */
  showCheckbox?: boolean,
|};

/**
 * [TileData] https://gestalt.pinterest.systems/web/tiledata component should be used for ... on the page.
 * ![TileData light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/TileData.spec.mjs-snapshots/TileData-chromium-darwin.png)
 * ![TileData dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/TileData-dark.spec.mjs-snapshots/TileData-dark-chromium-darwin.png)
 */
export default function TileData({ accessibilityLabel }: Props): Node {
  /**
   * Generates a background shade that's 10% lighter. This is dynamic because the data-viz pallete supports higher settings
   */
  const getBackgroundShade = () => {
    generateColorShade();
  };

  return (
    <Tile tooltip="The number of times your Pins were on screen">
      <DataPoint
        title="Werbeausgaben zurückgeben"
        value="1.5M"
        trend={{ value: 10, accessibilityLabel: 's' }}
      />
    </Tile>
  );
}
