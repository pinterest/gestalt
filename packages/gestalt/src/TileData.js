// @flow strict
import { useEffect, type Node, useState } from 'react';
import styles from './TileData.css';
import Box from './Box.js';
import Tile from './Tile/Tile.js';
import DataPoint from './Datapoint';
import generateColorShade from './utils/generateColorShade';
import { useColorScheme } from './contexts/ColorSchemeProvider';

type DataVisualizationColors =
  | 'data-visualization-01'
  | 'data-visualization-02'
  | 'data-visualization-03'
  | 'data-visualization-04'
  | 'data-visualization-05';

type Props = {|
  /**
   * Prop description.
   */
  accessibilityLabel?: string,
  /**
   * A color from the data visualization palette. if it's not in the pallete
   */
  selectedColor: DataVisualizationColors,
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
 * Use TileData to select a multiple categories to compare with each other in a graph or chart view, while still being able to see all of the data points
 */
export default function TileData({
  accessibilityLabel,
  disabled = false,
  id,
  selected,
  selectedColor = 'data-visualization-05',
  showCheckbox,
}: Props): Node {
  // bg color is a standard hex
  const [borderColor, setBorderColor] = useState('');

  const getColorHex = (color: string) =>
    getComputedStyle(document.documentElement).getPropertyValue(`--color-${color}`);

  /**
   * Generates a background shade that's 10% lighter. This is dynamic
   */
  const getBackgroundShade = () => {
    // value of the codes are injected
    const shade = getColorHex(selectedColor);
    // add an alpha channel to the hex, at 10% opacity
    const bgColor = shade + '10';
    return bgColor;
  };

  return (
    <Tile
      tooltip="The number of times your Pins were on screen"
      selected={selected}
      showCheckbox={showCheckbox}
      disabled={disabled}
      id={id}
      bgColor={getBackgroundShade(selectedColor)}
      borderColor={getColorHex(selectedColor)}
    >
      <DataPoint
        title="Werbeausgaben zurückgeben"
        value="1.5M"
        trend={{ value: 10, accessibilityLabel: 's' }}
      />
    </Tile>
  );
}
