// @flow strict
import { type Node } from 'react';
import DataPoint from './Datapoint.js';
import Tile from './Tile/Tile.js';


type DataVisualizationColors =
  | 'data-visualization-01'
  | 'data-visualization-02'
  | 'data-visualization-03'
  | 'data-visualization-04'
  | 'data-visualization-05';

type Props = {|
  /**
   * disables component interactivity
   */
  disabled?: boolean,
  /**
   * An identifier to be passed in a callback, and distinguish multiple DataPoints
   */
  id?: string,
  /**
   * Handler if the item is selected
   */
  onSelected: (id: string, selected: boolean) => void,
  /**
   * Controls whether the tile is selected or not
   */
  selected?: boolean,
  /**
   * A color from the data visualization palette. if it's not in the pallete
   */
  selectedColor: DataVisualizationColors,
  /**
   * Shows a checkbox. Useful when multi-select is available
   */
  showCheckbox?: boolean,
  /**
   * Adds a Tooltip on hover/focus of the Tile. See the With Tooltip variant to learn more.
   */
  tooltip?: string,
|} & DataPointCore;

/**
 * Use TileData to select a multiple categories to compare with each other in a graph or chart view, while still being able to see all of the data points
 */
export default function TileData({
  disabled = false,
  id = 'no-tile-id-provided',
  selected,
  selectedColor = 'data-visualization-05',
  showCheckbox,
  onSelected,
  tooltip
}: Props): Node {
  /** We use the color hex to generate a shade */
  const getColorHex = (color: string) =>
    getComputedStyle(document.documentElement).getPropertyValue(`--color-${color}`);

  /**
   * Generates a background shade that's 10% lighter. This is dynamic
   */
  const getBackgroundShade = () => {
    // value of the codes are injected
    const shade = getColorHex(selectedColor);
    // add an alpha channel to the hex, at 10% opacity
    const bgColor = `${shade}10`;
    return bgColor;
  };

  return (
    <Tile
      tooltip={tooltip}
      selected={selected}
      showCheckbox={showCheckbox}
      disabled={disabled}
      id={id}
      bgColor={getBackgroundShade(selectedColor)}
      borderColor={getColorHex(selectedColor)}
      onSelected={onSelected}
    >
      <DataPoint
        title="Werbeausgaben zurückgeben"
        value="1.5M"
        trend={{ value: 10, accessibilityLabel: 's' }}
      />
    </Tile>
  );
}
