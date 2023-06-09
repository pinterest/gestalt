// @flow strict
import { type Node, useId } from 'react';
import classnames from 'classnames';
import cssColorStyles from './Colors.css';
import styles from './TagData.css';
import Box from './Box.js';
import Flex from './Flex.js';
import Icon from './Icon.js';
import Text from './Text.js';
import { type Indexable } from './zIndex.js';
import InternalCheckbox from './Checkbox/InternalCheckbox.js';
import { useColorScheme } from './contexts/ColorSchemeProvider.js';
import { useDefaultLabelContext } from './contexts/DefaultLabelProvider.js';
import Tile, { type InteractionStates } from './Tile/Tile.js';
import DataVizColor from './utils/datavizcolors.js';

type DataVisualizationColors =
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

export type TileChangeHandler = ({|
  event:
    | SyntheticMouseEvent<HTMLDivElement>
    | SyntheticKeyboardEvent<HTMLDivElement>
    | SyntheticMouseEvent<HTMLAnchorElement>
    | SyntheticKeyboardEvent<HTMLAnchorElement>,
  selected: boolean,
  id?: string,
|}) => void;

export type OnRemoveHandler = ({|
  event:
    | SyntheticMouseEvent<HTMLDivElement>
    | SyntheticKeyboardEvent<HTMLDivElement>
    | SyntheticMouseEvent<HTMLAnchorElement>
    | SyntheticKeyboardEvent<HTMLAnchorElement>,
  id?: string,
|}) => void;

type TooltipProps = {|
  accessibilityLabel?: string,
  inline?: boolean,
  idealDirection?: 'up' | 'right' | 'down' | 'left',
  text: string,
  zIndex?: Indexable,
|};

export type Props = {|
  /**
   * If your app uses DefaultLabelProvider, a default value for this label will be used. Using this prop will override the default label value with a more specific label if desired. This populates the `aria-label` on the remove icon.
   */
  accessibilityRemoveIconLabel?: string,
  /**
   * The default color for TagData shown on an unselected state.
   */
  baseColor?: 'default' | 'white',
  /**
   * A color code from the the [data visualization palette](https://gestalt.pinterest.systems/foundations/data_visualization/palette) that appears when the tile is selected.
   */
  color?: DataVisualizationColors,
  /**
   * Indicates if TagData should be disabled. Disabled TagDatas are inactive and cannot be interacted with. See the [disabled](https://gestalt.pinterest.systems/web/tagdata#disabled) variant to learn more.
   */
  disabled?: boolean,
  /**
   * An identifier to be passed back in the onTap callback. It can be helpful to distinguish multiple TagDatas.
   */
  id?: string,
  /**
   * Handler if the item selection state was changed with a click or a keyboard press.
   */
  onTap?: TileChangeHandler,
  /**
   * TagData can be dismissable by the "X" affordance, which triggers the onRemove callback. This handler should take care of state updates to no longer render the TagData.
   */
  onRemove?: OnRemoveHandler,
  /**
   * Controls whether the TagData is selected or not. Use it alongside the OnTap handler.
   */
  selected?: boolean,
  /**
   * Sets the size of the TagData to render. See the [size](https://gestalt.pinterest.systems.com/web/tagdata#size) variant.
   */
  size?: 'sm' | 'md' | 'lg',
  /**
   * Shows a visible checkbox when Tagdata is in a selected state. See the [group variant](https://gestalt.pinterest.systems/web/tagdata#Group) to learn more.
   */
  showCheckbox?: boolean,
  /**
   * Short text to render inside TagData.
   */
  text: string,
  /**
   * Adds a tooltip on hover/focus of TileData. See the with [Tooltip](https://gestalt.pinterest.systems/web/tagdata#tooltip) variant to learn more.
   */
  tooltip?: TooltipProps,
|};

const sizes = {
  'sm': { fontSize: '200' },
  'md': { fontSize: '200' },
  'lg': { fontSize: '300' },
};

/**
 * [TagData](https://gestalt.pinterest.systems/web/tagdata)  enables users to select multiple categories to compare with each other in a graph or chart. It contains a label and can be used as a filter for different sources.
 *
 * ![TagData light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/tagdata.spec.mjs-snapshots/tagdata-chromium-darwin.png)
 * ![TagData dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/tagdata-dark.spec.mjs-snapshots/tagdata-dark-chromium-darwin.png)
 */
export default function TagData({
  accessibilityRemoveIconLabel,
  baseColor = 'default',
  color = '05',
  disabled = false,
  id,
  onTap,
  onRemove,
  selected,
  showCheckbox,
  size = 'md',
  text,
  tooltip,
}: Props): Node {
  const { accessibilityRemoveIconLabel: accessibilityRemoveIconLabelDefault } =
    useDefaultLabelContext('TagData');

  const theme = useColorScheme();
  const borderColor = DataVizColor.getDataVisualizationColor(theme, color);
  const bgColor = DataVizColor.getDataVisualizationColorForBackground(theme, color);
  const fgColor = disabled ? 'subtle' : 'default';

  const colorStyles: {| borderColor?: string, backgroundColor?: string |} = {
    borderColor,
    backgroundColor: bgColor,
  };

  const getTagClasses = ({ hovered, disabled: tapDisabled }: InteractionStates) =>
    classnames(styles.tagBase, {
      [styles.tagLarge]: size === 'lg',
      [styles.tagMedium]: size === 'md',
      [styles.tagSmall]: size === 'sm',
      [cssColorStyles.secondary]: baseColor === 'default',
      [cssColorStyles.default]: baseColor === 'white',
      [styles.hovered]: hovered && !tapDisabled,
      [styles.disabled]: tapDisabled,
      [styles.tagWrapperRounded]: !onRemove,
      [styles.tagWrapperDismiss]: onRemove,
    });

  const getRemoveIconClasses = ({ hovered, disabled: tapDisabled }: InteractionStates) =>
    classnames(styles.dismissButton, styles.dismissButtonRounding, {
      [cssColorStyles.secondary]: baseColor === 'default',
      [cssColorStyles.default]: baseColor === 'white',
      [styles.dismissHovered]: hovered && !tapDisabled,
      [styles.disabled]: tapDisabled,
    });

  const checkboxId = useId();

  return (
    <Box display="inlineBlock" maxWidth={300} rounding={2}>
      <Tile interactive={false} selected={selected} disabled={disabled}>
        {(interactionStates) => {
          const { hovered, disabled: disabledTap, selected: selectedTap } = interactionStates;
          const tileStyle = DataVizColor.getTileColors(
            { hovered, selected: selectedTap, disabled: disabledTap },
            colorStyles,
          );

          const checkBoxStyle = DataVizColor.getCheckboxColors(
            { hovered, selected: selectedTap, disabled: disabledTap },
            colorStyles,
            { showByDefault: true },
          );

          return (
            <div className={styles.tagContainer}>
              <Tile
                id={id}
                onTap={onTap}
                disabled={disabled}
                selected={selected}
                rounding={0}
                outerContainerClass={styles.tagOuterContainer}
                tooltip={tooltip}
              >
                <div className={getTagClasses(interactionStates)} style={tileStyle}>
                  <Flex alignItems="center" width="100%">
                    {showCheckbox && (
                      <div className={styles.checkBoxMargin}>
                        <InternalCheckbox
                          id={`readonly-checkbox-${checkboxId}`}
                          checked={selectedTap}
                          readOnly
                          size="sm"
                          style={checkBoxStyle}
                        />
                      </div>
                    )}
                    <div title={text}>
                      <Text inline size={sizes[size]?.fontSize} lineClamp={1} color={fgColor}>
                        {text}
                      </Text>
                    </div>
                  </Flex>
                </div>
              </Tile>
              {onRemove && (
                <Tile
                  onTap={({ event }) => {
                    onRemove?.({ event, id });
                  }}
                  disabled={disabled}
                  rounding={0}
                >
                  <div className={getRemoveIconClasses(interactionStates)} style={tileStyle}>
                    <Icon
                      accessibilityLabel={
                        accessibilityRemoveIconLabel ?? accessibilityRemoveIconLabelDefault
                      }
                      color={fgColor}
                      icon="cancel"
                      size={8}
                    />
                  </div>
                </Tile>
              )}
            </div>
          );
        }}
      </Tile>
    </Box>
  );
}
