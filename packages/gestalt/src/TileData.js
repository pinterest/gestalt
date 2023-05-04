// @flow strict
import { type Node } from 'react';
import DataPoint from './Datapoint.js';
import { type DataPointBaseProps } from './Datapoint/DataPointBaseProps.js';
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
  onChange: ({| selected: boolean, id?: string |}) => void,
  /**
   * Controls whether the tile is selected or not
   */
  selected?: boolean,
  /**
   * A color from the data visualization palette. if it's not in the pallete
   */
  color: DataVisualizationColors,
  /**
   * Shows a checkbox. Useful when multi-select is available
   */
  showCheckbox?: boolean,
  /**
   * Adds a Tooltip on hover/focus of the Tile. See the with [Tooltip](#Tooltip) variant to learn more.
   */
  tooltip?: string,
|} & DataPointBaseProps;

/**
 * Use TileData to select a multiple categories to compare with each other in a graph or chart view, while still being able to see all of the data points
 */
export default function TileData({
  disabled = false,
  id = 'no-tile-id-provided',
  selected,
  color = 'data-visualization-05',
  showCheckbox,
  onChange,
  tooltip,
  title,
  value,
  trend,
}: Props): Node {
  /** We use the color hex to generate a shade. Data visualization colors are a part of the tokens */
  const getColorHex = (tokenName: string) =>
    getComputedStyle(document.documentElement).getPropertyValue(`--color-${tokenName}`);

  /**
   * Generates a background shade that's 10% lighter. This is dynamic
   */
  const getBackgroundShade = () => {
    // value of the codes are injected
    const shade = getColorHex(color);
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
      bgColor={getBackgroundShade(color)}
      borderColor={getColorHex(color)}
      onChange={onChange}
    >
      <DataPoint title={title} value={value} trend={trend} />
    </Tile>
  );
}
