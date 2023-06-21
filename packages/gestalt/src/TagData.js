// @flow strict
import { type Node, useId } from 'react';
import classnames from 'classnames';
import borderStyles from './Borders.css';
import Box from './Box.js';
import InternalCheckbox from './Checkbox/InternalCheckbox.js';
import cssColorStyles from './Colors.css';
import { useColorScheme } from './contexts/ColorSchemeProvider.js';
import { useDefaultLabelContext } from './contexts/DefaultLabelProvider.js';
import focusStyles from './Focus.css';
import Icon from './Icon.js';
import styles from './TagData.css';
import TapArea from './TapArea.js';
import Text from './Text.js';
import useFocusVisible from './useFocusVisible.js';
import getCheckboxColors from './utils/datavizcolors/getCheckboxColor.js';
import getDataVisualizationColor from './utils/datavizcolors/getDataVisualizationColor.js';
import MaybeTooltip from './utils/MaybeTooltip.js';
import useInteractiveStates from './utils/useInteractiveStates.js';
import { type Indexable } from './zIndex.js';

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
   * If your app uses [DefaultLabelProvider](https://gestalt.pinterest.systems/web/utilities/defaultlabelprovider), a default value for this label will be used. Using this prop will override the default label value with a more specific label if desired. This populates the `aria-label` on the remove icon.
   */
  accessibilityRemoveIconLabel?: string,
  /**
   * The default color for TagData shown in an unselected state.
   */
  baseColor?: 'primary' | 'secondary',
  /**
   * A color code from the [data visualization palette](https://gestalt.pinterest.systems/foundations/data_visualization/color/palette) that appears when the TagData is selected.
   */
  color?: DataVisualizationColors,
  /**
   * Indicates if TagData should be disabled. Disabled TagDatas are inactive and cannot be interacted with. See the [disabled variant](https://gestalt.pinterest.systems/web/tagdata#disabled) to learn more.
   */
  disabled?: boolean,
  /**
   * An identifier to be passed back in the `onTap` callback. It can be helpful to distinguish multiple TagDatas.
   */
  id?: string,
  /**
   * Handler if the item selection state was changed with a click or a keyboard press.
   */
  onTap?: TileChangeHandler,
  /**
   * TagData can be dismissable by the "X" affordance, which triggers the `onRemove` callback. This handler should take care of state updates to no longer render the TagData.
   */
  onRemove?: OnRemoveHandler,
  /**
   * Controls whether the TagData is selected or not. Use it alongside the `onTap` handler.
   */
  selected?: boolean,
  /**
   * Sets the size of the TagData to render. See the [size variant](https://gestalt.pinterest.systems.com/web/tagdata#size) to learn more.
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
   * Adds a tooltip on hover/focus of TagData. See the [with tooltip variant](https://gestalt.pinterest.systems/web/tagdata#tooltip) to learn more.
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
  baseColor = 'primary',
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
  const borderColor = getDataVisualizationColor(theme, color);
  const bgColor = getDataVisualizationColor(theme, color, { lighten: true });
  const fgColor = disabled ? 'subtle' : 'default';

  const colorStyles: {| borderColor?: string, backgroundColor?: string |} = {
    borderColor,
    backgroundColor: bgColor,
  };

  const { handleOnBlur, handleOnMouseEnter, handleOnMouseLeave, isHovered } =
    useInteractiveStates();

  const isFocusVisible = useFocusVisible();

  const getTagClasses = () =>
    classnames(borderStyles.solid, borderStyles.transparentBorder, {
      [styles.tagLarge]: size === 'lg',
      [styles.tagMedium]: size === 'md',
      [styles.tagSmall]: size === 'sm',
      [cssColorStyles.secondary]: baseColor === 'primary',
      [cssColorStyles.default]: baseColor === 'secondary',
      [styles.hovered]: isHovered,
      [styles.disabled]: disabled,
      [styles.tagWrapperRounded]: true,
    });

  const getRemoveIconClasses = () =>
    classnames(
      borderStyles.solid,
      borderStyles.transparentBorder,
      styles.dismissButton,
      styles.dismissButtonRounding,
      styles.dismissButtonPosition,
      focusStyles.hideOutline,
      {
        [cssColorStyles.secondary]: baseColor === 'primary',
        [cssColorStyles.default]: baseColor === 'secondary',
        [styles.disabled]: disabled,
        [styles.dismissHovered]: isHovered,
        [focusStyles.accessibilityOutline]: isFocusVisible,
      },
    );

  const checkboxId = useId();

  const tileStyle = selected && !disabled ? colorStyles : {};

  const checkBoxStyle = getCheckboxColors(
    { hovered: isHovered, selected: !!selected, disabled },
    colorStyles,
    {
      showByDefault: true,
    },
  );

  return (
    <Box display="inlineBlock" position="relative" maxWidth={300} rounding={2}>
      <MaybeTooltip tooltip={tooltip} disabled={disabled}>
        <TapArea
          fullHeight
          fullWidth
          disabled={disabled}
          onBlur={handleOnBlur}
          onTap={({ event }) => onTap?.({ event, id, selected: !selected })}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
          role="button"
          rounding={2}
        >
          <div className={getTagClasses()} style={tileStyle}>
            <Box
              display="flex"
              alignItems="center"
              height="100%"
              paddingX={2}
              marginEnd={onRemove ? 4 : 0}
            >
              {showCheckbox && (
                <Box marginEnd={1}>
                  <InternalCheckbox
                    id={`readonly-checkbox-${checkboxId}`}
                    checked={selected}
                    readOnly
                    size="sm"
                    style={checkBoxStyle}
                  />
                </Box>
              )}
              <Text inline size={sizes[size]?.fontSize} lineClamp={1} color={fgColor}>
                {text}
              </Text>
            </Box>
          </div>
        </TapArea>
      </MaybeTooltip>
      {onRemove && (
        <button
          disabled={disabled}
          className={getRemoveIconClasses()}
          style={tileStyle}
          type="button"
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
          onClick={(event) => {
            onRemove({ event, id });
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="center" width="100%">
            <Icon
              accessibilityLabel={
                accessibilityRemoveIconLabel ?? accessibilityRemoveIconLabelDefault
              }
              color={fgColor}
              icon="cancel"
              size={10}
            />
          </Box>
        </button>
      )}
    </Box>
  );
}
