// @flow strict
import { type Node, useId } from 'react';
import classnames from 'classnames';
import focusStyles from './Focus.css';
import tagStyles from './Tag.css';
import styles from './TagData.css';
import touchableStyles from './TapArea.css';
import Box from './Box.js';
import Flex from './Flex.js';
import Icon from './Icon.js';
import Text from './Text.js';
import useFocusVisible from './useFocusVisible.js';
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

export type Props = {|
  /**
   * If your app uses DefaultLabelProvider, a default value for this label will be used. Using this prop will override the default label value with a more specific label if desired. This populates the `aria-label` on the remove icon.
   */
  accessibilityRemoveIconLabel?: string,
  /**
   * A valid color code from the [data visualization palette](https://gestalt.pinterest.systems/foundations/data_visualization/palette).
   */
  color?: DataVisualizationColors,
  /**
   * Disabled tags appear inactive and cannot be interacted with.
   */
  disabled?: boolean,
  /**
   * Allows the tag to be disabled
   */
  dismissable?: boolean,
  /**
   * Handler if the item selection state is changed.
   */
  onTap?: TileChangeHandler,
  /**
   * Callback fired when the user dismisses the tag. This handler should take care of state updates to no longer render the Tag.
   */
  onRemove?: ({| event: SyntheticMouseEvent<HTMLButtonElement> |}) => void,
  /**
   * Controls whether the TileData is selected or not. Use it alongside the OnTap handler.
   */
  selected?: boolean,
  /**
   * Size of the Tag Data, see the [sizes](https://gestalt.pinterest.systems.com/web/tagdata#sizes) variant
   */
  size?: 'sm' | 'md' | 'lg',
  /**
   * Short text to render inside the Tag.
   */
  text: string,
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
  color = '05',
  dismissable = false,
  disabled = false,
  onTap,
  onRemove,
  selected,
  size = 'md',
  text,
}: Props): Node {
  const { accessibilityRemoveIconLabel: accessibilityRemoveIconLabelDefault } =
    useDefaultLabelContext('Tag');

  const { isFocusVisible } = useFocusVisible();

  const removeIconClasses = classnames(
    tagStyles.button,
    tagStyles.secondary,
    focusStyles.hideOutline,
    touchableStyles.tapTransition,
    {
      [focusStyles.accessibilityOutline]: isFocusVisible,
    },
  );

  const theme = useColorScheme();
  const borderColor = DataVizColor.getDataVisualizationColor(theme, color);
  const bgColor = DataVizColor.getDataVisualizationColorForBackground(theme, color);

  const colorStyles: {| borderColor?: string, backgroundColor?: string |} = {
    borderColor,
    backgroundColor: bgColor,
  };

  const getClasses = ({
    hovered,
    selected: tapSelected,
    disabled: tapDisabled,
  }: InteractionStates) =>
    classnames(styles.tagWrapper, {
      [styles.selected]: tapSelected,
      [styles.hovered]: hovered,
      [styles.disabled]: tapDisabled,
      [styles.tagWrapperDismiss]: dismissable,
      [styles.tagWrapperRounded]: !dismissable,
    });

  const checkboxId = useId();

  return (
    <Box
      aria-disabled={disabled}
      display="inlineBlock"
      height={sizes[size]?.height || 40}
      maxWidth={300}
      rounding={2}
    >
      <Box width="100%" height="100%" alignItems="center" display="flex">
        <Tile rounding={dismissable ? 0 : 2} onTap={onTap} selected={selected} disabled={disabled}>
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
              <div className={getClasses(interactionStates)} style={tileStyle}>
                <Flex alignItems="center" height="100%" gap={2}>
                  <InternalCheckbox
                    id={`readonly-checkbox-${checkboxId}`}
                    checked={selectedTap}
                    readOnly
                    size="sm"
                    style={checkBoxStyle}
                  />
                  <div title={text} style={{ height: '100%' }}>
                    <Text inline size={sizes[size]?.fontSize} lineClamp={1}>
                      {text}
                    </Text>
                  </div>
                </Flex>
              </div>
            );
          }}
        </Tile>
        <Box marginStart={disabled ? 2 : 0} height="100%">
          {dismissable && (
            <button
              className={removeIconClasses}
              onClick={onRemove}
              type="button"
              style={{ height: '100%' }}
            >
              <Icon
                accessibilityLabel={
                  accessibilityRemoveIconLabel ?? accessibilityRemoveIconLabelDefault
                }
                color="default"
                icon="cancel"
                size={8}
              />
            </button>
          )}
        </Box>
      </Box>
    </Box>
  );
}
