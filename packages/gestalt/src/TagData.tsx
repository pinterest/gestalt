import { useId } from 'react';
import classnames from 'classnames';
import borderStyles from './Borders.css';
import Box from './Box';
import InternalCheckbox from './Checkbox/InternalCheckbox';
import { useColorScheme } from './contexts/ColorSchemeProvider';
import { useDefaultLabelContext } from './contexts/DefaultLabelProvider';
import focusStyles from './Focus.css';
import Icon from './Icon';
import MaybeTooltip from './sharedSubcomponents/MaybeTooltip';
import styles from './TagData.css';
import TapArea from './TapArea';
import Text from './Text';
import useFocusVisible from './useFocusVisible';
import getCheckboxColors from './utils/datavizcolors/getCheckboxColor';
import getDataVisualizationColor from './utils/datavizcolors/getDataVisualizationColor';
import useInteractiveStates from './utils/useInteractiveStates';
import { Indexable } from './zIndex';

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

export type TileChangeHandler = (arg1: {
  event:
    | React.MouseEvent<HTMLDivElement>
    | React.KeyboardEvent<HTMLDivElement>
    | React.MouseEvent<HTMLAnchorElement>
    | React.KeyboardEvent<HTMLAnchorElement>;
  selected: boolean;
  id?: string;
}) => void;

export type OnRemoveHandler = (arg1: {
  event: React.MouseEvent<HTMLButtonElement>;
  id?: string;
}) => void;

type TooltipProps = {
  accessibilityLabel?: string;
  inline?: boolean;
  idealDirection?: 'up' | 'right' | 'down' | 'left';
  text: string | ReadonlyArray<string>;
  zIndex?: Indexable;
};

export type Props = {
  /**
   * If your app uses [DefaultLabelProvider](https://gestalt.pinterest.systems/web/utilities/defaultlabelprovider), a default value for this label will be used. Using this prop will override the default label value with a more specific label if desired. This populates the `aria-label` on the remove icon.
   */
  accessibilityRemoveIconLabel?: string;
  /**
   * The default color for TagData shown in an unselected state.
   */
  baseColor?: 'primary' | 'secondary';
  /**
   * A color code from the [data visualization palette](https://gestalt.pinterest.systems/foundations/data_visualization/color/palette) that appears when the TagData is selected.
   */
  color?: DataVisualizationColors;
  /**
   * Indicates if TagData should be disabled. Disabled TagDatas are inactive and cannot be interacted with. See the [disabled variant](https://gestalt.pinterest.systems/web/tagdata#disabled) to learn more.
   */
  disabled?: boolean;
  /**
   * An identifier to be passed back in the `onTap` callback. It can be helpful to distinguish multiple TagDatas.
   */
  id?: string;
  /**
   * Handler if the item selection state was changed with a click or a keyboard press.
   */
  onTap?: TileChangeHandler;
  /**
   * TagData can be dismissable by the "X" affordance, which triggers the `onRemove` callback. This handler should take care of state updates to no longer render the TagData.
   */
  onRemove?: OnRemoveHandler;
  /**
   * Controls whether the TagData is selected or not. Use it alongside the `onTap` handler.
   */
  selected?: boolean;
  /**
   * Defines the height of the TagData to render. See the [size variant](https://gestalt.pinterest.systems.com/web/tagdata#size) to learn more.
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Shows a visible checkbox when Tagdata is in a selected state. See the [group variant](https://gestalt.pinterest.systems/web/tagdata#Group) to learn more.
   */
  showCheckbox?: boolean;
  /**
   * Short text to render inside TagData.
   */
  text: string;
  /**
   * Adds a tooltip on hover/focus of TagData. See the [with tooltip variant](https://gestalt.pinterest.systems/web/tagdata#tooltip) to learn more.
   */
  tooltip?: TooltipProps;
};

const sizes = {
  sm: { fontSize: '200' },
  md: { fontSize: '200' },
  lg: { fontSize: '300' },
} as const;

/**
 * [TagData](https://gestalt.pinterest.systems/web/tagdata)  enables users to select multiple categories to compare with each other in a graph or chart. It contains a label and can be used as a filter for different sources.
 *
 * ![TagData light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/tagdata.spec.ts-snapshots/tagdata-chromium-darwin.png)
 * ![TagData dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/tagdata-dark.spec.ts-snapshots/tagdata-dark-chromium-darwin.png)
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
}: Props) {
  const { accessibilityRemoveIconLabel: accessibilityRemoveIconLabelDefault } =
    useDefaultLabelContext('TagData');

  const { colorSchemeName } = useColorScheme();
  const borderColor = getDataVisualizationColor(colorSchemeName, color);
  const bgColor = getDataVisualizationColor(colorSchemeName, color, { lighten: true });
  const fgColor = disabled ? 'subtle' : 'default';

  const colorStyles: {
    borderColor?: string;
    backgroundColor?: string;
  } = {
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
      [styles.primary]: baseColor === 'primary',
      [styles.secondary]: baseColor === 'secondary',
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
      {
        [styles.primary]: baseColor === 'primary',
        [styles.secondary]: baseColor === 'secondary',
        [styles.disabled]: disabled,
        [styles.dismissHovered]: isHovered,
        [focusStyles.hideOutline]: !isFocusVisible,
        [focusStyles.accessibilityOutline]: isFocusVisible,
      },
    );

  const checkboxId = useId();

  const tileStyle = selected && !disabled ? colorStyles : {};

  const checkBoxStyle = getCheckboxColors({
    state: { hovered: isHovered, selected: !!selected, disabled },
    colorStyles,
    opts: {
      showByDefault: true,
    },
  });

  return (
    <Box display="inlineBlock" maxWidth={300} position="relative" rounding={2}>
      <MaybeTooltip disabled={disabled} tooltip={tooltip}>
        <TapArea
          disabled={disabled}
          fullHeight
          fullWidth
          onBlur={handleOnBlur}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
          onTap={({ event }) => onTap?.({ event, id, selected: !selected })}
          role="button"
          rounding={2}
        >
          <div className={getTagClasses()} style={tileStyle}>
            <Box
              alignItems="center"
              display="flex"
              height="100%"
              marginEnd={onRemove ? 4 : 0}
              paddingX={2}
            >
              {showCheckbox && (
                <Box marginEnd={1}>
                  <InternalCheckbox
                    checked={selected}
                    id={`readonly-checkbox-${checkboxId}`}
                    readOnly
                    size="sm"
                    style={checkBoxStyle}
                  />
                </Box>
              )}
              <Text
                color={fgColor}
                inline
                lineClamp={1} // removes html caption if a tooltip exists
                overflow="breakAll"
                size={sizes[size]?.fontSize}
                title={tooltip && tooltip.text ? '' : text}
              >
                {text}
              </Text>
            </Box>
          </div>
        </TapArea>
      </MaybeTooltip>
      {onRemove && (
        <button
          className={getRemoveIconClasses()}
          disabled={disabled}
          onClick={(event) => {
            onRemove({ event, id });
          }}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
          style={tileStyle}
          type="button"
        >
          <Box alignItems="center" display="flex" justifyContent="center" width="100%">
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

TagData.displayName = 'TagData';
