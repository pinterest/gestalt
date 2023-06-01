// @flow strict
import { type Node, useId } from 'react';
import classnames from 'classnames';
import styles from './TileData.css';
import Flex from './Flex.js';
import { type Indexable } from './zIndex.js';
import InternalCheckbox from './Checkbox/InternalCheckbox.js';
import { useColorScheme } from './contexts/ColorSchemeProvider.js';
import InternalDatapoint from './Datapoint/InternalDatapoint.js';
import Tile, { type InteractionStates } from './Tile/Tile.js';
import DataVizColor from './utils/datavizcolors.js';

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

export type DataVisualizationColors =
  | '01'
  | '02'
  | '03'
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
   * A valid color code from the [data visualization palette](https://gestalt.pinterest.systems/foundations/data_visualization/palette).
   */
  color?: DataVisualizationColors,
  /**
   * Indicates if TileData should be disabled. Disabled TileData is inactive and cannot be interacted with.
   */
  disabled?: boolean,
  /**
   * An optional identifier to be passed back in the onTap callback. It can be helpful to distinguish multiple TileDatas.
   */
  id?: string,
  /**
   * Handler if the item selection state is changed.
   */
  onTap?: TileChangeHandler,
  /**
   * Controls whether the TileData is selected or not. Use it alongside the OnTap handler.
   */
  selected?: boolean,
  /**
   * Shows a visible checkbox when TileData is in a selected state. See when using in a [group](https://gestalt.pinterest.systems/web/tiledata#Group).
   */
  showCheckbox?: boolean,
  /**
   * The header text for the component.
   */
  title: string,
  /**
   * Adds a Tooltip on hover/focus of the TileData. See the with [Tooltip](https://gestalt.pinterest.systems/web/tooltip) variant to learn more.
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
 * [TileData](https://gestalt.pinterest.systems/web/tiledata) enables users to select a multiple categories to compare with each other in a graph or chart view, while still being able to see all of the data points.
 *
 * ![TileData light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/TileData.spec.mjs-snapshots/TileData-chromium-darwin.png)
 * ![TileData dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/TileData-dark.spec.mjs-snapshots/TileData-dark-chromium-darwin.png)
 *
 */
export default function TileData({
  color = '05',
  disabled = false,
  id,
  onTap,
  selected,
  showCheckbox,
  tooltip,
  title,
  trend,
  trendSentiment,
  value,
}: Props): Node {
  const theme = useColorScheme();
  const borderColor = DataVizColor.getDataVisualizationColor(theme, color);
  const bgColor = DataVizColor.getDataVisualizationColorForBackground(theme, color);

  const colorStyles: {| borderColor?: string, backgroundColor?: string |} = {
    borderColor,
    backgroundColor: bgColor,
  };

  const checkboxId = useId();

  const getClasses = ({
    hovered,
    selected: tapSelected,
    disabled: tapDisabled,
  }: InteractionStates) =>
    classnames(styles.baseTile, styles.tileWidth, {
      [styles.selected]: tapSelected,
      [styles.hovered]: hovered,
      [styles.disabled]: tapDisabled,
    });

  return (
    <Tile disabled={disabled} id={id} onTap={onTap} selected={selected} tooltip={tooltip}>
      {(interactionState) => {
        const { hovered, disabled: disabledTap, selected: selectedTap } = interactionState;
        const tileStyle = DataVizColor.getTileColors(
          { hovered, selected: selectedTap, disabled: disabledTap },
          colorStyles,
        );

        const checkBoxStyle = DataVizColor.getCheckboxColors(
          { hovered, selected: selectedTap, disabled: disabledTap },
          colorStyles,
        );

        return (
          <div style={tileStyle} className={getClasses(interactionState)}>
            <Flex direction="row" gap={2}>
              <InternalDatapoint
                disabled={disabled}
                lineClamp={2}
                minTitleWidth={80}
                title={title}
                trend={trend}
                trendSentiment={trendSentiment}
                value={value}
              />
              {showCheckbox && (
                <InternalCheckbox
                  id={`readonly-checkbox-blah-${checkboxId}`}
                  checked={selected}
                  readOnly
                  size="sm"
                  style={checkBoxStyle}
                />
              )}
            </Flex>
          </div>
        );
      }}
    </Tile>
  );
}
