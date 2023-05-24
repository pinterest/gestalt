// @flow strict
import { type Node } from 'react';
import classnames from 'classnames';
import Box from '../Box.js';
import InternalCheckbox from '../Checkbox/InternalCheckbox.js';
import Flex from '../Flex.js';
import TapArea, { type OnTapType } from '../TapArea.js';
import Tooltip from '../Tooltip.js';
import useFocusVisible from '../useFocusVisible.js';
import useInteractiveStates from '../utils/useInteractiveStates.js';
import { type Indexable } from '../zIndex.js';
import styles from './Tile.css';

type TooltipProps = {|
  accessibilityLabel?: string,
  inline?: boolean,
  idealDirection?: 'up' | 'right' | 'down' | 'left',
  text: string,
  zIndex?: Indexable,
|};

type ColorStyles = {| borderColor?: string, backgroundColor?: string |};

type InteractionStates = {|
  disabled: boolean,
  hovered: boolean,
  selected: boolean,
|};

type TileChangeHandler = ({|
  event:
    | SyntheticMouseEvent<HTMLDivElement>
    | SyntheticKeyboardEvent<HTMLDivElement>
    | SyntheticMouseEvent<HTMLAnchorElement>
    | SyntheticKeyboardEvent<HTMLAnchorElement>,
  selected: boolean,
  id?: string,
|}) => void;

type Props = {|
  /**
   * The background color of the tile as a hex. Don't forget about tokenization.
   */
  bgColor?: string,
  /**
   * The border color of the tile. Don't forget about tokenization.
   */
  borderColor?: string,
  /**
   * The content to be wrapped by tile.
   */
  children?: Node,
  disabled?: boolean,
  id?: string,
  selected?: boolean,
  showCheckbox?: boolean,
  onTap?: TileChangeHandler,
  tooltip?: TooltipProps,
|};

function MaybeTooltip({
  children,
  disabled,
  tooltip,
}: {|
  children: Node,
  disabled?: boolean,
  tooltip?: TooltipProps,
|}) {
  if (!tooltip || disabled) return children;
  return (
    <Tooltip
      accessibilityLabel={tooltip.accessibilityLabel}
      inline={tooltip.inline}
      idealDirection={tooltip.idealDirection || 'up'}
      text={tooltip.text}
      zIndex={tooltip.zIndex}
    >
      {children}
    </Tooltip>
  );
}

function getCheckboxColors(state: InteractionStates, colorStyles: ColorStyles) {
  const defaultBackgroundColor = 'transparent';
  const defaultBorderColor = 'transparent';

  if (state.disabled) {
    return {
      backgroundColor: `var(--color-gray-roboflow-300)`,
      borderColor: defaultBorderColor,
    };
  }

  if (state.hovered && !state.selected) {
    return {
      backgroundColor: `var(--g-colorGray0)`,
      borderColor: 'var(--color-border-default)',
    };
  }

  if (state.selected) {
    return {
      backgroundColor: colorStyles.borderColor,
      borderColor: defaultBorderColor,
    };
  }

  return { backgroundColor: defaultBackgroundColor, borderColor: defaultBorderColor };
}

function getTileColors(state: InteractionStates, colorStyles: ColorStyles) {
  // only show colors in a selected state
  if (state.selected && !state.disabled) {
    return colorStyles;
  }
  return {};
}

/**
 * Used Internally to wrap a component with a Tile View
 */
export default function Tile({
  bgColor,
  borderColor,
  children,
  disabled = false,
  id = '',
  onTap,
  selected = false,
  showCheckbox,
  tooltip,
}: Props): Node {
  const { handleOnBlur, handleOnMouseEnter, handleOnMouseLeave, isHovered } =
    useInteractiveStates();

  const { isFocusVisible } = useFocusVisible();

  const classes = classnames(styles.tile, styles.tileWidth, {
    [styles.selected]: selected,
    [styles.hovered]: isHovered && !isFocusVisible,
    [styles.disabled]: disabled,
  });

  const handleClick: OnTapType = ({ event }) => {
    onTap?.({ event, id, selected: !selected });
  };

  const handleKeyDown = ({
    event,
  }: {|
    event: SyntheticKeyboardEvent<HTMLDivElement> | SyntheticKeyboardEvent<HTMLAnchorElement>,
  |}) => {
    if (event.key === 'ENTER') {
      onTap?.({ event, id, selected: !selected });
    }
  };

  const colorStyles: {| borderColor?: string, backgroundColor?: string |} = {
    borderColor,
    backgroundColor: bgColor,
  };

  const tileStyle = getTileColors({ hovered: isHovered, selected, disabled }, colorStyles);

  const checkBoxStyle = getCheckboxColors({ hovered: isHovered, selected, disabled }, colorStyles);

  return (
    <Box position="relative">
      <MaybeTooltip tooltip={tooltip} disabled={disabled}>
        <TapArea
          role="button"
          disabled={disabled}
          rounding={4}
          onBlur={handleOnBlur}
          onTap={handleClick}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
          onKeyDown={handleKeyDown}
        >
          <div className={classes} style={tileStyle}>
            <Flex direction="row" gap={2}>
              {children}
              {showCheckbox && (
                <InternalCheckbox
                  id={id}
                  checked={selected}
                  readOnly
                  size="sm"
                  style={checkBoxStyle}
                />
              )}
            </Flex>
          </div>
        </TapArea>
      </MaybeTooltip>
    </Box>
  );
}
