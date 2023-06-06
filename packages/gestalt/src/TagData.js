// @flow strict
import { type Node, useId } from 'react';
import classnames from 'classnames';
import cssColorStyles from './Colors.css';
import focusStyles from './Focus.css';
import styles from './TagData.css';
import Box from './Box.js';
import Flex from './Flex.js';
import Icon from './Icon.js';
import Text from './Text.js';
import useFocusVisible from './useFocusVisible.js';
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
   * A color for the unselected state.
   */
  baseColor?: 'default' | 'white',
  /**
   * A color code from the the [data visualization palette](https://gestalt.pinterest.systems/foundations/data_visualization/palette) that appears when the tile is colored.
   */
  color?: DataVisualizationColors,
  /**
   * Disabled Tagdatas appear inactive and cannot be interacted with.
   */
  disabled?: boolean,
  /**
   * Tagdatas can be dismissable by the "X" affordance, which triggers the onRemove callback.
   */
  dismissable?: boolean,
  /**
   * An optional identifier to be passed back in the onTap callback. It can be helpful to distinguish multiple TagDatas.
   */
  id?: string,
  /**
   * Handler if the item selection state was changed.
   */
  onTap?: TileChangeHandler,
  /**
   * Callback fired when the user dismisses the tag. This handler should take care of state updates to no longer render the TagData.
   */
  onRemove?: OnRemoveHandler,
  /**
   * Controls whether the TagData is selected or not. Use it alongside the OnTap handler.
   */
  selected?: boolean,
  /**
   * Size of the TagData, see the [sizes](https://gestalt.pinterest.systems.com/web/tagdata#sizes) variant.
   */
  size?: 'sm' | 'md' | 'lg',
  /**
   * Shows a visible checkbox when Tagdata is in a selected state. See when using in a [group](https://gestalt.pinterest.systems/web/tagdata#Group).
   */
  showCheckbox?: boolean,
  /**
   * Short text to render inside the TagData.
   */
  text: string,
  /**
   * Adds a Tooltip on hover/focus of the TagData. See the with [Tooltip](https://gestalt.pinterest.systems/web/tagdata#tooltip) variant to learn more.
   */
  tooltip?: TooltipProps,
|};

const sizes = {
  'sm': { height: 32, fontSize: '200' },
  'md': { height: 40, fontSize: '200' },
  'lg': { height: 48, fontSize: '300' },
};

/**
 * [Tags](https://gestalt.pinterest.systems/web/tag) are objects that hold text and have a delete icon to remove them. They can appear within [TextFields](https://gestalt.pinterest.systems/web/textfield#tagsExample), [TextAreas](https://gestalt.pinterest.systems/web/textarea#tagsExample), [ComboBox](https://gestalt.pinterest.systems/web/combobox#Tags) or as standalone components.
 *
 * ![Tag light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Tag.spec.mjs-snapshots/Tag-chromium-darwin.png)
 * ![Tag dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Tag-dark.spec.mjs-snapshots/Tag-dark-chromium-darwin.png)
 */
export default function TagData({
  accessibilityRemoveIconLabel,
  baseColor = 'default',
  color = '05',
  dismissable = false,
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
    useDefaultLabelContext('Tag');

  const { isFocusVisible } = useFocusVisible();

  const theme = useColorScheme();
  const borderColor = DataVizColor.getDataVisualizationColor(theme, color);
  const bgColor = DataVizColor.getDataVisualizationColorForBackground(theme, color);
  const fgColor = disabled ? 'subtle' : 'default';

  const colorStyles: {| borderColor?: string, backgroundColor?: string |} = {
    borderColor,
    backgroundColor: bgColor,
  };

  const getTagClasses = ({ hovered, disabled: tapDisabled }: InteractionStates) =>
    classnames(styles.tagWrapper, {
      [cssColorStyles.secondary]: baseColor === 'default',
      [cssColorStyles.default]: baseColor === 'white',
      [styles.hovered]: hovered && !tapDisabled,
      [styles.disabled]: tapDisabled,
      [styles.tagWrapperRounded]: !dismissable,
      [styles.tagWrapperDismiss]: dismissable,
    });

  const getRemoveIconClasses = ({ hovered, disabled: tapDisabled }: InteractionStates) =>
    classnames(styles.dismissButton, {
      [cssColorStyles.secondary]: baseColor === 'default',
      [cssColorStyles.default]: baseColor === 'white',
      [styles.dismissHovered]: hovered && !tapDisabled,
      [styles.disabled]: tapDisabled,
      [focusStyles.accessibilityOutline]: isFocusVisible,
    });

  const checkboxId = useId();

  return (
    <Box display="inlineBlock" height={sizes[size]?.height || 40} maxWidth={300} rounding={2}>
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
            <div style={{ display: 'flex', gap: '1px' }}>
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
                  <Box alignItems="center" display="flex" padding={2} width="100%">
                    {showCheckbox && (
                      <InternalCheckbox
                        id={`readonly-checkbox-${checkboxId}`}
                        checked={selectedTap}
                        readOnly
                        size="sm"
                        style={checkBoxStyle}
                      />
                    )}
                    <div title={text} style={{ marginLeft: showCheckbox ? '4px' : 'none' }}>
                      <Text inline size={sizes[size]?.fontSize} lineClamp={1} color={fgColor}>
                        {text}
                      </Text>
                    </div>
                  </Box>
                </div>
              </Tile>
              {dismissable && (
                <Tile
                  outerContainerClass={getRemoveIconClasses(interactionStates)}
                  outerContainerStyle={tileStyle}
                  onTap={({ event }) => {
                    onRemove?.({ event, id });
                  }}
                  type="button"
                  disabled={disabled}
                >
                  <Icon
                    accessibilityLabel={
                      accessibilityRemoveIconLabel ?? accessibilityRemoveIconLabelDefault
                    }
                    color={fgColor}
                    icon="cancel"
                    size={8}
                  />
                </Tile>
              )}
            </div>
          );
        }}
      </Tile>
    </Box>
  );
}
