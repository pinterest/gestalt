// @flow strict
import { type Node } from 'react';
import { type Indexable } from './zIndex.js';
import { useColorScheme } from './contexts/ColorSchemeProvider.js';
import InternalDatapoint from './Datapoint/InternalDatapoint.js';
import Tile from './Tile/Tile.js';

type TooltipProps = {|
  accessibilityLabel?: string,
  inline?: boolean,
  idealDirection?: 'up' | 'right' | 'down' | 'left',
  text: string,
  zIndex?: Indexable,
|};

export type TileChangeHandler = ({|
  event:
    | SyntheticMouseEvent<HTMLDivElement>
    | SyntheticKeyboardEvent<HTMLDivElement>
    | SyntheticMouseEvent<HTMLAnchorElement>
    | SyntheticKeyboardEvent<HTMLAnchorElement>,
  selected: boolean,
  id?: string,
|}) => void;

// Note: 03 is ommited because it doesn't have a corresponding dark token
type DataVisualizationColors =
  | '01'
  | '02'
  | '04'
  | '05'
  | '06'
  | '07'
  | '08'
  | '09'
  | '10'
  | '11'
  | '12';

type TrendObject = {|
  accessibilityLabel: string,
  value: number,
|};

type Props = {|
  /**
   * A valid color code from the [data visualization palette](https://gestalt.pinterest.systems/foundations/data_visualization/palette). 03 is not supported yet, because it has no corresponding dark theme.
   */
  color?: DataVisualizationColors,
  /**
   * Indicates if TileData should be disabled. Disabled TileData is inactive and cannot be interacted with.
   */
  disabled?: boolean,
  /**
   * An optional identifier to be passed back in the onChange callback. It can be helpful to distinguish multiple DataPoints.
   */
  id?: string,
  /**
   * Handler if the item selection state is changed.
   */
  onChange?: TileChangeHandler,
  /**
   * Controls whether the tile is selected or not.
   */
  selected?: boolean,
  /**
   * Shows a visible checkbox when the tile is selected state. See when using in a [group](https://gestalt.pinterest.systems/web/tiledata#Group).
   */
  showCheckbox?: boolean,
  /**
   * The header text for the component.
   */
  title: string,
  /**
   * Adds a Tooltip on hover/focus of the Tile. See the with [Tooltip](https://gestalt.pinterest.systems/web/tooltip) variant to learn more.
   */
  tooltip?: TooltipProps,
  /**
   * Object detailing the trend value (change in time - e.g., +30%), and accessibilityLabel to describe the trend's icon (e.g., "Trending up").  See the [trend](https://gestalt.pinterest.systems/web/datapoint#Trend) variant to learn more.
   */
  trend?: TrendObject,
  /**
   * A visual indicator whether the trend is considered "good", "bad" or "neutral". By setting \`trendSentiment\` to \`auto\`, a positive trend will be considered "good", a negative trend will be considered "bad" and a trend of zero will be considered "neutral".  See the [trendSentiment](https://gestalt.pinterest.systems/web/datapoint#Trend-sentiment) variant to learn more.
   */
  trendSentiment?: 'good' | 'bad' | 'neutral' | 'auto',
  /**
   * The datapoint value (e.g., 1.23M).
   */
  value: string,
|};

/**
 * Use TileData to select a multiple categories to compare with each other in a graph or chart view, while still being able to see all of the data points
 */
export default function TileData({
  color = '05',
  disabled = false,
  id,
  onChange,
  selected,
  showCheckbox,
  tooltip,
  title,
  trend,
  trendSentiment,
  value,
}: Props): Node {
  const theme = useColorScheme();

  /** We use the color hex to generate a shade. Data visualization colors are a part of theme tokens */
  const getColorHex = (vizColor: string) => {
    const hex = theme[`colorDataVisualization${vizColor}`];
    if (!hex) throw new Error('Invalid Color Token provided to TileData');
    return hex;
  };

  /**
   * Generates a background shade that's 10% lighter. This is dynamic
   */
  const getBackgroundShade = () => {
    // value of the codes are injected
    const shade = getColorHex(color);
    // add an alpha channel to the hex, at 10% opacity
    // https://gist.github.com/lopspower/03fb1cc0ac9f32ef38f4
    const bgColor = `${shade}1A`;
    return bgColor;
  };

  return (
    <Tile
      tooltip={tooltip}
      selected={selected}
      showCheckbox={showCheckbox}
      disabled={disabled}
      id={id}
      bgColor={getBackgroundShade()}
      borderColor={getColorHex(color)}
      onChange={onChange}
    >
      <InternalDatapoint
        title={title}
        value={value}
        trend={trend}
        trendSentiment={trendSentiment}
        disabled={disabled}
      />
    </Tile>
  );
}
