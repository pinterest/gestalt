// @flow strict
import { type Node as ReactNode } from 'react';
import classnames from 'classnames';
import { TOKEN_COLOR_BORDER_TAG_DISABLED } from 'gestalt-design-tokens';
import Box from './Box';
import { useDefaultLabelContext } from './contexts/DefaultLabelProvider';
import focusStyles from './Focus.css';
import Icon from './Icon';
import styles from './Tag.css';
import touchableStyles from './TapArea.css';
import Text from './Text';
import useFocusVisible from './useFocusVisible';

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

const applyDensityTheme = (size: 'sm' | 'md' | 'lg') => {
  switch (size) {
    case 'sm':
      return {
        rounding: 1,
        paddingX: 1,
        paddingY: undefined,
        height: 24,
        iconSize: 12,
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
        iconSize: 16,
        removeIconGap: 4,
        removeIconSize: 8,
        fontSize: '200',
      };
    case 'md':
    default:
      return {
        rounding: 2,
        paddingX: 2,
        paddingY: 1,
        height: 32,
        iconSize: 12,
        removeIconGap: 3,
        removeIconSize: 8,
        fontSize: '200',
      };
  }
};
/**
 * [Tags](https://gestalt.pinterest.systems/web/tag) can be used to categorize, classify or filter content, usually via keywords. They can appear within [TextFields](https://gestalt.pinterest.systems/web/textfield#tagsExample), [TextAreas](https://gestalt.pinterest.systems/web/textarea#tagsExample), [ComboBox](https://gestalt.pinterest.systems/web/combobox#Tags) or as standalone components.
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
}: Props): ReactNode {
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
    styles.closeButton,
    styles[type],
    focusStyles.hideOutline,
    touchableStyles.tapTransition,
    {
      [focusStyles.accessibilityOutline]: isFocusVisible,
    },
    styles[size],
  );

  const { height, rounding, paddingX, paddingY, fontSize, iconSize, removeIconSize } =
    applyDensityTheme(size);

  return (
    <Box
      aria-disabled={disabled}
      color={bgColor}
      dangerouslySetInlineStyle={{
        __style:
          disabled && !hasIcon ? { border: `solid 1px ${TOKEN_COLOR_BORDER_TAG_DISABLED}` } : {},
      }}
      display="inlineBlock"
      height={height}
      maxWidth={300}
      paddingX={paddingX}
      paddingY={paddingY}
      position="relative"
      rounding={rounding}
    >
      <Box alignItems="center" display="flex" height="100%" marginEnd={5}>
        {(type === 'error' || type === 'warning') && (
          <Box marginEnd={1} marginStart={1}>
            <Icon
              accessibilityLabel={accessibilityLabels[type]}
              color={fgColor}
              icon={iconsByType[type]}
              size={iconSize}
            />
          </Box>
        )}

        <Text color={fgColor} inline lineClamp={1} overflow="breakAll" size={fontSize}>
          {text}
        </Text>

        <Box>
          {!disabled && (
            <button className={removeIconClasses} onClick={onRemove} type="button">
              <Box alignItems="center" display="flex" justifyContent="center" width="100%">
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

Tag.displayName = 'Tag';
