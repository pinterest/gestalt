// @flow strict
import { type Node, useId } from 'react';
import classnames from 'classnames';
import Box from './Box.js';
import InternalCheckbox from './Checkbox/InternalCheckbox.js';
import { useColorScheme } from './contexts/ColorSchemeProvider.js';
import InternalDatapoint from './Datapoint/InternalDatapoint.js';
import Flex from './Flex.js';
import TapArea from './TapArea.js';
import styles from './TileData.css';
import getCheckboxColors from './utils/datavizcolors/getCheckboxColor.js';
import getDataVisualizationColor from './utils/datavizcolors/getDataVisualizationColor.js';
import MaybeTooltip from './utils/MaybeTooltip.js';
import useInteractiveStates from './utils/useInteractiveStates.js';
import { type Indexable } from './zIndex.js';

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
   * A valid color code from the [data visualization palette](https://gestalt.pinterest.systems/foundations/data_visualization/color/palette).
   */
  color?: DataVisualizationColors,
  /**
   * Indicates if TileData should be disabled. Disabled TileDatas are inactive and cannot be interacted with. See the [disabled variant](https://gestalt.pinterest.systems/web/tiledata#Disabled) to learn more.
   */
  disabled?: boolean,
  /**
   * An optional identifier to be passed back in the `onTap` callback. It can be helpful to distinguish multiple TileDatas.
   */
  id?: string,
  /**
   * Handler called when the item selection state is changed.
   */
  onTap?: TileChangeHandler,
  /**
   * Controls whether TileData is selected or not. Use this prop along with the `onTap` handler.
   */
  selected?: boolean,
  /**
   * Shows a visible checkbox when TileData is in a selected state. See the [group variant](https://gestalt.pinterest.systems/web/tiledata#Group) to learn more.
   */
  showCheckbox?: boolean,
  /**
   * The header text for TileData.
   */
  title: string,
  /**
   * Adds a tooltip on hover/focus of TileData. See the [with tooltip](https://gestalt.pinterest.systems/web/tiledata#Tooltip) variant to learn more.
   */
  tooltip?: TooltipProps,
  /**
   * Object detailing the trend value (change in time - e.g., +30%), and accessibility label to describe the trend's icon (e.g., "Trending up").  See the [trend variant](https://gestalt.pinterest.systems/web/datapoint#Trend) to learn more.
   */
  trend?: TrendObject,
  /**
   * A visual indicator whether the trend is considered "good", "bad" or "neutral". By setting \`trendSentiment\` to \`auto\`, a positive trend will be considered "good", a negative trend will be considered "bad" and a trend of zero will be considered "neutral".  See the [trendSentiment variant](https://gestalt.pinterest.systems/web/datapoint#Trend-sentiment) to learn more.
   */
  trendSentiment?: 'good' | 'bad' | 'neutral' | 'auto',
  /**
   * The datapoint value (e.g., 1.23M).
   */
  value: string,
|};

/**
 * [TileData](https://gestalt.pinterest.systems/web/tiledata) enables users to select multiple categories to compare with each other in a graph or chart view, while still being able to see all of the data points.
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
  const borderColor = getDataVisualizationColor(theme, color);
  const bgColor = getDataVisualizationColor(theme, color, { lighten: true });

  const colorStyles: {| borderColor?: string, backgroundColor?: string |} = {
    borderColor,
    backgroundColor: bgColor,
  };

  const { handleOnBlur, handleOnMouseEnter, handleOnMouseLeave, isHovered } =
    useInteractiveStates();

  const checkboxId = useId();

  const getClasses = () =>
    classnames(styles.baseTile, styles.tileWidth, {
      [styles.selected]: selected,
      [styles.hovered]: isHovered,
      [styles.disabled]: disabled,
    });

  const tileStyle = selected && !disabled ? colorStyles : {};

  const checkBoxStyle = getCheckboxColors(
    { hovered: isHovered, selected: !!selected, disabled },
    colorStyles,
  );

  return (
    <MaybeTooltip tooltip={tooltip} disabled={disabled}>
      <Box maxWidth={196}>
        <TapArea
          disabled={disabled}
          onBlur={handleOnBlur}
          onTap={({ event }) => onTap?.({ event, id, selected: !selected })}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
          role="button"
          rounding={4}
        >
          <div style={tileStyle} className={getClasses()}>
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
        </TapArea>
      </Box>
    </MaybeTooltip>
  );
}
