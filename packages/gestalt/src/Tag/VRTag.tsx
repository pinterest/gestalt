import classnames from 'classnames';
import Box from '../Box';
import { useDefaultLabelContext } from '../contexts/DefaultLabelProvider';
import focusStyles from '../Focus.css';
import Icon from '../Icon';
import IconCompact from '../IconCompact';
import styles from '../Tag.css';
import touchableStyles from '../TapArea.css';
import Text from '../Text';
import useFocusVisible from '../useFocusVisible';

const backgroundColorByType = Object.freeze({
  default: 'secondary',
  error: 'errorWeak',
  warning: 'warningWeak',
  selected: 'selected',
});

const foregroundColorByType = Object.freeze({
  default: 'default',
  error: 'error',
  warning: 'warning',
  selected: 'light',
});

const iconsByType = Object.freeze({
  error: 'compact-workflow-status-problem',
  warning: 'compact-workflow-status-warning',
});

type Props = {
  /**
   * If your app uses DefaultLabelProvider, a default value for this label will be used. Using this prop will override the default label value with a more specific label if desired. This populates the `aria-label` on the remove icon.
   */
  accessibilityRemoveIconLabel?: string;
  /**
   * Disabled tags appear inactive and cannot be interacted with.
   */
  disabled?: boolean;
  /**
   * Callback fired when the user dismisses the tag. This handler should take care of state updates to no longer render the Tag.
   */
  onRemove: (arg1: { event: React.MouseEvent<HTMLButtonElement> }) => void;
  /**
   * Size of the Tag. Default is `md`. See [size variant](https://gestalt.pinterest.systems/web/tag#Size) for more details.
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Short text to render inside the Tag.
   */
  text: string;
  /**
   * Communicate a "warning" or "error" state to the user, with an accompanying icon and specific background color.
   */
  type?: 'default' | 'error' | 'warning';
  /**
   * Indicates the tag is selected. This is purely visual and does not affect the behavior of the tag.
   */
  selected?: boolean;
  /**
   * Callback fired when the user click the tag. This handler should take care of state updates to render selected state.
   */
  onClick: (arg1: { event: React.MouseEvent<HTMLButtonElement> }) => void;
};

const applyDensityTheme = (size: 'sm' | 'md' | 'lg') => {
  switch (size) {
    case 'sm':
      return {
        rounding: 1,
        paddingX: 1.5,
        paddingY: undefined,
        height: 24,
        iconSize: 12,
        removeIconGap: 2,
        removeIconSize: 10,
        fontSize: '100',
      };
    case 'lg':
      return {
        rounding: 3,
        paddingX: 3,
        paddingY: 2,
        height: 48,
        iconSize: 16,
        removeIconGap: 4,
        removeIconSize: 10,
        fontSize: '300',
      };
    case 'md':
    default:
      return {
        rounding: 2,
        paddingX: 2,
        paddingY: 1.5,
        height: 32,
        iconSize: 12,
        removeIconGap: 3,
        removeIconSize: 10,
        fontSize: '200',
      };
  }
};
/**
 * [Tags](https://gestalt.pinterest.systems/web/tag) can be used to categorize, classify or filter content, usually via keywords. They can appear within [TextFields](https://gestalt.pinterest.systems/web/textfield#tagsExample), [TextAreas](https://gestalt.pinterest.systems/web/textarea#tagsExample), [ComboBox](https://gestalt.pinterest.systems/web/combobox#Tags) or as standalone components.
 *
 * ![Tag light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Tag.spec.ts-snapshots/Tag-chromium-darwin.png)
 * ![Tag dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Tag-dark.spec.ts-snapshots/Tag-dark-chromium-darwin.png)
 */
export default function Tag({
  accessibilityRemoveIconLabel,
  disabled = false,
  onRemove,
  size = 'md',
  text,
  type = 'default',
  onClick,
  selected = false,
}: Props) {

  const bgColor = backgroundColorByType[ selected? 'selected':type];
  const fgColor = disabled ? 'subtle' : foregroundColorByType[selected? 'selected':type];

  const {
    accessibilityErrorIconLabel,
    accessibilityRemoveIconLabel: accessibilityRemoveIconLabelDefault,
    accessibilityWarningIconLabel,
  } = useDefaultLabelContext('Tag');
  const accessibilityLabels = {
    error: accessibilityErrorIconLabel,
    warning: accessibilityWarningIconLabel,
  } as const;

  const { isFocusVisible } = useFocusVisible();


  const typeClass = selected ? 'selected' : `${type}VR`;

  const removeIconClasses = classnames(
    styles.closeButton,
    styles[typeClass],
    touchableStyles.tapTransition,
    {
      [focusStyles.hideOutline]: !isFocusVisible,
      [focusStyles.accessibilityOutlineVR]: isFocusVisible,
    },
    styles[size],
  );

  const hoverClass = `onClick${size}`

  const onClickButtonClasses = classnames(
    styles.clickButtonVR,
    styles[typeClass],
    touchableStyles.tapTransition,
    {
      [focusStyles.hideOutline]: !isFocusVisible,
      [focusStyles.accessibilityOutlineVR]: isFocusVisible,
    },
    styles[hoverClass]
  );

  const { height, rounding, paddingX, paddingY, fontSize, iconSize, removeIconSize } =
    applyDensityTheme(size);

  return (
    <Box
      aria-disabled={disabled}
      color={bgColor}
      dangerouslySetInlineStyle={{
        __style: { backgroundColor: disabled ? '#D1D1C7' : ''},
      }}
      display="inlineBlock"
      height={height}
      maxWidth={300}
      // @ts-expect-error - TS2322 - Type 'number' is not assignable to type 'Padding | undefined'.
      paddingX={paddingX}
      // @ts-expect-error - TS2322 - Type 'number | undefined' is not assignable to type 'Padding | undefined'.
      paddingY={paddingY}
      position="relative"
      // @ts-expect-error - TS2322 - Type 'number' is not assignable to type '0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | "circle" | "pill" | undefined'.
      rounding={rounding}
    >
      <Box alignItems="center" display="flex" height="100%" marginEnd={disabled ? 0 : 4}>
      {/* @ts-expect-error - TS2322 - Type '(arg1: { event: MouseEvent<HTMLButtonElement, MouseEvent>; }) => void' is not assignable to type 'MouseEventHandler<HTMLButtonElement>'. */}
      <button className={onClickButtonClasses} onClick={onClick} type="button">
        <Box alignItems="center" display="flex" height="100%">

          {(type === 'error' || type === 'warning') && (
            <Box marginEnd={1} >
              <IconCompact
                accessibilityLabel={accessibilityLabels[type]}
                color={fgColor}
                icon={iconsByType[type]}
                size={iconSize}
              />
            </Box>
          )}

          <Text
            color={fgColor}
            inline
            lineClamp={1}
            overflow="breakAll"
            // @ts-expect-error - TS2322 - Type 'string' is not assignable to type 'Size | undefined'.
            size={fontSize}
          >
            {text}
          </Text>
          </Box>
        </button>

        <Box>
          {!disabled && (
            // @ts-expect-error - TS2322 - Type '(arg1: { event: MouseEvent<HTMLButtonElement, MouseEvent>; }) => void' is not assignable to type 'MouseEventHandler<HTMLButtonElement>'.
            <button className={removeIconClasses} onClick={onRemove} type="button">
              <Box
                alignItems="center"
                dangerouslySetInlineStyle={{
                  __style: { marginTop: '1px' },
                }}
                display="flex"
                justifyContent="center"
                width="100%"
              >
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
