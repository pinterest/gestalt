// @flow strict
import { type Node } from 'react';
import classnames from 'classnames';
import Box from '../Box.js';
import { useColorScheme } from '../contexts/ColorSchemeProvider.js';
import { useDefaultLabelContext } from '../contexts/DefaultLabelProvider.js';
import Flex from '../Flex.js';
import focusStyles from '../Focus.css';
import Icon from '../Icon.js';
import touchableStyles from '../TapArea.css';
import Text from '../Text.js';
import Tile from '../Tile/Tile.js';
import useFocusVisible from '../useFocusVisible.js';
import styles from './InternalTag.css';

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

type Size = '100' | '200' | '300' | '400' | '500' | '600';

type Props = {|
  accessibilityRemoveIconLabel?: string,
  disabled?: boolean,
  onRemove?: ({| event: SyntheticMouseEvent<HTMLButtonElement> |}) => void,
  text: string,
  type?: 'default' | 'error' | 'warning',
  /**
   * Height of the tag
   */
  containerHeight?: number,
  /**
   * Gestalt font size (e.g. 100, 200, sm, large)
   */
  fontSize?: Size,
|};

/**
 * Makes the body clickable
 * @returns
 */
function MaybeTile({
  children,
  interactive,
  tooltip,
}: {|
  children: Node,
  interactive: boolean,
  tooltip: any,
|}): Node {
  return interactive ? <Tile tooltip={tooltip}>{children} </Tile> : children;
}

// wrap content in a tap area

// add left children and move to tag area

// move color styles to main tag component

export default function InternalTag({
  accessibilityRemoveIconLabel,
  containerHeight = 32,
  disabled = false,
  fontSize = '200',
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
        __style:
          disabled && !hasIcon
            ? { border: `solid 1px ${colorGray200}` }
            : {
                backgroundColor: 'red',
              },
      }}
      display="inlineBlock"
      height={containerHeight}
      maxWidth={300}
      rounding={2}
    >
      <Flex alignItems="center" height="100%">
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
            <Text color={fgColor} inline size={fontSize} lineClamp={1}>
              {text}
            </Text>
          </div>
        </Flex>

        <Box marginStart={disabled ? 2 : 1} height="100%">
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
