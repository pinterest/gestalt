// @flow strict
import { type Node } from 'react';
import classnames from 'classnames';
import Box from './Box.js';
import { useColorScheme } from './contexts/ColorSchemeProvider.js';
import { useDefaultLabelContext } from './contexts/DefaultLabelProvider.js';
import Flex from './Flex.js';
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

type Props = {|
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
  onRemove: ({| event: SyntheticMouseEvent<HTMLButtonElement> |}) => void,
  /**
   * Short text to render inside the Tag.
   */
  text: string,
  /**
   * Communicate a "warning" or "error" state to the user, with an accompanying icon and specific background color.
   */
  type?: 'default' | 'error' | 'warning',
|};

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
  );

  return (
    <Box
      aria-disabled={disabled}
      color={bgColor}
      dangerouslySetInlineStyle={{
        __style: disabled && !hasIcon ? { border: `solid 1px ${colorGray200}` } : {},
      }}
      display="inlineBlock"
      height={32}
      maxWidth={300}
      rounding={2}
    >
      <Flex alignItems="center" height="100%">
        <Box marginStart={hasIcon ? 2 : 0} marginEnd={2}>
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

        <div title={text}>
          <Text color={fgColor} inline size="200" lineClamp={1}>
            {text}
          </Text>
        </div>

        <Box marginStart={disabled ? 2 : 1}>
          {!disabled && (
            <button className={removeIconClasses} onClick={onRemove} type="button">
              <Icon
                accessibilityLabel={
                  accessibilityRemoveIconLabel ?? accessibilityRemoveIconLabelDefault
                }
                color={fgColor}
                icon="cancel"
                size={8}
              />
            </button>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
