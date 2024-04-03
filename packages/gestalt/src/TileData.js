// @flow strict
import { type Node as ReactNode, useId } from 'react';
import classnames from 'classnames';
import Box from './Box';
import InternalCheckbox from './Checkbox/InternalCheckbox';
import { useColorScheme } from './contexts/ColorSchemeProvider';
import InternalDatapoint from './Datapoint/InternalDatapoint';
import Flex from './Flex';
import TapArea from './TapArea';
import styles from './TileData.css';
import getCheckboxColors from './utils/datavizcolors/getCheckboxColor';
import getDataVisualizationColor from './utils/datavizcolors/getDataVisualizationColor';
import MaybeTooltip from './utils/MaybeTooltip';
import useInteractiveStates from './utils/useInteractiveStates';
import { type Indexable } from './zIndex';

type TooltipProps = {
  accessibilityLabel?: string,
  inline?: boolean,
  idealDirection?: 'up' | 'right' | 'down' | 'left',
  text: string | $ReadOnlyArray<string>,
  zIndex?: Indexable,
};

export type TileChangeHandler = ({
  event:
    | SyntheticMouseEvent<HTMLDivElement>
    | SyntheticKeyboardEvent<HTMLDivElement>
    | SyntheticMouseEvent<HTMLAnchorElement>
    | SyntheticKeyboardEvent<HTMLAnchorElement>,
  selected: boolean,
  id?: string,
}) => void;

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

type TrendObject = {
  accessibilityLabel: string,
  value: number,
};

type Props = {
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
   * Object detailing the trend value (change in time - e.g. +30%), and accessibility label to describe the trend's icon (e.g., "Trending up").  See the [trend variant](https://gestalt.pinterest.systems/web/datapoint#Trend) to learn more.
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
};

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
}: Props): ReactNode {
  const { colorSchemeName } = useColorScheme();
  const borderColor = getDataVisualizationColor(colorSchemeName, color);

  const colorStyles: { borderColor?: string, backgroundColor?: string } = {
    borderColor,
  };

  const { handleOnBlur, handleOnMouseEnter, handleOnMouseLeave, isHovered } =
    useInteractiveStates();

  const checkboxId = useId();

  const getClasses = () =>
    classnames(styles.baseTile, styles.tileWidth, {
      [styles.hovered]: isHovered,
      [styles.disabled]: disabled,
      [styles[`dataVisualizationColor${color}`]]: selected && !disabled,
    });

  const tileStyle = selected && !disabled ? colorStyles : {};
  const checkBoxStyle = getCheckboxColors({
    state: { hovered: isHovered, selected: !!selected, disabled },
    colorStyles,
  });

  return (
    <MaybeTooltip disabled={disabled} tooltip={tooltip}>
      <Box>
        <TapArea
          disabled={disabled}
          onBlur={handleOnBlur}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
          onTap={({ event }) => onTap?.({ event, id, selected: !selected })}
          role="button"
          rounding={4}
        >
          <div className={getClasses()} style={tileStyle}>
            <Flex direction="row" gap={2}>
              <InternalDatapoint
                disabled={disabled}
                lineClamp={2}
                maxTitleWidth={135}
                minTitleWidth={80}
                numTitleRows={2}
                title={title}
                trend={trend}
                trendSentiment={trendSentiment}
                value={value}
              />
              {showCheckbox && (
                <InternalCheckbox
                  checked={selected}
                  id={`readonly-checkbox-blah-${checkboxId}`}
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

TileData.displayName = 'TileData';
