// @flow strict
import { type Node } from 'react';
import classnames from 'classnames';
import Box from './Box.js';
import { useColorScheme } from './contexts/ColorSchemeProvider.js';
import { useDefaultLabelContext } from './contexts/DefaultLabelProvider.js';
import focusStyles from './Focus.css';
import Icon from './Icon.js';
import styles from './Tag.css';
import touchableStyles from './TapArea.css';
import Text from './Text.js';
import useFocusVisible from './useFocusVisible.js';

const backgroundColorByType = Object.freeze({
  default: 'secondary',
  error: 'errorBase',
  warning: 'warningBase',
});

const foregroundColorByType = Object.freeze({
  default: 'default',
  error: 'inverse',
  warning: 'inverse',
});

const iconsByType = Object.freeze({
  error: 'workflow-status-problem',
  warning: 'workflow-status-warning',
});

type Props = {
  /**
   * If your app uses DefaultLabelProvider, a default value for this label will be used. Using this prop will override the default label value with a more specific label if desired. This populates the `aria-label` on the remove icon.
   */
  accessibilityRemoveIconLabel?: string,
  /**
   * Disabled tags appear inactive and cannot be interacted with.
   */
  disabled?: boolean,
  /**
   * Callback fired when the user dismisses the tag. This handler should take care of state updates to no longer render the Tag.
   */
  onRemove: ({ event: SyntheticMouseEvent<HTMLButtonElement> }) => void,
  /**
   * Size of the Tag. Default is `md`. See [size variant](https://gestalt.pinterest.systems/web/tag#Size) for more details.
   */
  size?: 'sm' | 'md' | 'lg',
  /**
   * Short text to render inside the Tag.
   */
  text: string,
  /**
   * Communicate a "warning" or "error" state to the user, with an accompanying icon and specific background color.
   */
  type?: 'default' | 'error' | 'warning',
};

const applyDensityTheme = (s: 'sm' | 'md' | 'lg') => {
  switch (s) {
    case 'sm':
      return {
        rounding: 1,
        paddingX: 1,
        paddingY: 0,
        height: 24,
        removeIconGap: 2,
        removeIconSize: 8,
        fontSize: '100',
      };
    case 'lg':
      return {
        rounding: 3,
        paddingX: 4,
        paddingY: 3,
        height: 48,
        removeIconGap: 4,
        removeIconSize: 12,
        fontSize: '200',
      };
    case 'md':
    default:
      return {
        rounding: 2,
        paddingX: 2,
        paddingY: 1,
        height: 32,
        removeIconGap: 3,
        removeIconSize: 8,
        fontSize: '200',
      };
  }
};
/**
 * [Tags](https://gestalt.pinterest.systems/web/tag) are objects that hold text and have a delete icon to remove them. They can appear within [TextFields](https://gestalt.pinterest.systems/web/textfield#tagsExample), [TextAreas](https://gestalt.pinterest.systems/web/textarea#tagsExample), [ComboBox](https://gestalt.pinterest.systems/web/combobox#Tags) or as standalone components.
 *
 * ![Tag light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Tag.spec.mjs-snapshots/Tag-chromium-darwin.png)
 * ![Tag dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Tag-dark.spec.mjs-snapshots/Tag-dark-chromium-darwin.png)
 */
export default function Tag({
  accessibilityRemoveIconLabel,
  disabled = false,
  onRemove,
  size = 'md',
  text,
  type = 'default',
}: Props): Node {
  const { colorGray200 } = useColorScheme();

  const hasIcon = ['error', 'warning'].includes(type);

  const bgColor = backgroundColorByType[type];
  const fgColor = disabled && !hasIcon ? 'subtle' : foregroundColorByType[type];

  const {
    accessibilityErrorIconLabel,
    accessibilityRemoveIconLabel: accessibilityRemoveIconLabelDefault,
    accessibilityWarningIconLabel,
  } = useDefaultLabelContext('Tag');
  const accessibilityLabels = {
    error: accessibilityErrorIconLabel,
    warning: accessibilityWarningIconLabel,
  };

  const { isFocusVisible } = useFocusVisible();

  const removeIconClasses = classnames(
    styles.button,
    styles[bgColor],
    focusStyles.hideOutline,
    touchableStyles.tapTransition,
    {
      [focusStyles.accessibilityOutline]: isFocusVisible,
    },
    styles[size],
  );

  const { height, rounding, paddingX, paddingY, fontSize, removeIconSize } =
    applyDensityTheme(size);

  return (
    <Box
      position="relative"
      aria-disabled={disabled}
      color={bgColor}
      dangerouslySetInlineStyle={{
        __style: disabled && !hasIcon ? { border: `solid 1px ${colorGray200}` } : {},
      }}
      display="inlineBlock"
      height={height}
      rounding={rounding}
      paddingX={paddingX}
      paddingY={paddingX}
      maxWidth={300}
    >
      <Box display="flex" alignItems="center" height="100%" marginEnd={5}>
        <Box marginStart={hasIcon ? 1 : 0} marginEnd={hasIcon ? 1 : 0}>
          {/* Not using hasIcon to appease Flow */}
          {(type === 'error' || type === 'warning') && (
            <Icon
              accessibilityLabel={accessibilityLabels[type]}
              color={fgColor}
              icon={iconsByType[type]}
              size={12}
            />
          )}
        </Box>

        <Text color={fgColor} inline size={fontSize} lineClamp={1}>
          {text}
        </Text>

        <Box>
          {!disabled && (
            <button className={removeIconClasses} onClick={onRemove} type="button">
              <Box display="flex" justifyContent="center" alignItems="center" width="100%">
                <Icon
                  accessibilityLabel={
                    accessibilityRemoveIconLabel ?? accessibilityRemoveIconLabelDefault
                  }
                  color={fgColor}
                  icon="cancel"
                  size={removeIconSize}
                />
              </Box>
            </button>
          )}
        </Box>
      </Box>
    </Box>
  );
}
