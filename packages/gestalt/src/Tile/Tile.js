// @flow strict
import { type Node } from 'react';
import Box from '../Box.js';
import { type Rounding } from '../boxTypes.js';
import TapArea, { type OnTapType } from '../TapArea.js';
import Tooltip from '../Tooltip.js';
import useFocusVisible from '../useFocusVisible.js';
import useInteractiveStates from '../utils/useInteractiveStates.js';
import { type Indexable } from '../zIndex.js';

type TooltipProps = {|
  accessibilityLabel?: string,
  inline?: boolean,
  idealDirection?: 'up' | 'right' | 'down' | 'left',
  text: string,
  zIndex?: Indexable,
|};

export type ColorStyles = {| borderColor?: string, backgroundColor?: string |};

export type InteractionStates = {|
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

type MaybeTapAreaProps = {|
  children?: Node | ((state: InteractionStates) => Node),
  disabled?: boolean,
  id?: string,
  focusable?: boolean,
  onTap?: TileChangeHandler,
  selected?: boolean,
  rounding?: Rounding,
|};

type Props = {|
  ...MaybeTapAreaProps,
  outerContainerClass?: string,
  outerContainerStyle?: ColorStyles,
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

function MaybeTapArea({
  children,
  disabled = false,
  id = '',
  focusable = false,
  onTap,
  rounding = 4,
  selected = false,
}: MaybeTapAreaProps): Node {
  const { handleOnBlur, handleOnMouseEnter, handleOnMouseLeave, isHovered } =
    useInteractiveStates();

  const { isFocusVisible } = useFocusVisible();

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

  const renderChildren = () =>
    typeof children !== 'function' ? (
      <Box height="100%" width="100%" borderStyle="none">
        {children}
      </Box>
    ) : (
      children({ selected, hovered: isHovered && !isFocusVisible, disabled })
    );

  return focusable ? (
    <TapArea
      fullHeight
      fullWidth
      disabled={disabled}
      onBlur={handleOnBlur}
      onTap={handleClick}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      onKeyDown={handleKeyDown}
      role="button"
      rounding={rounding}
    >
      {renderChildren()}
    </TapArea>
  ) : (
    <div
      role="presentation"
      onBlur={handleOnBlur}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      style={{ width: '100%', height: '100%' }}
    >
      {renderChildren()}
    </div>
  );
}

/**
 * Used Internally to wrap a component with a Tile View
 */
export default function Tile({
  children,
  disabled = false,
  id = '',
  focusable = true,
  onTap,
  outerContainerClass,
  outerContainerStyle,
  rounding = 4,
  selected = false,
  tooltip,
}: Props): Node {
  return (
    <div className={outerContainerClass} style={outerContainerStyle}>
      <MaybeTooltip tooltip={tooltip} disabled={disabled}>
        <MaybeTapArea
          disabled={disabled}
          id={id}
          focusable={focusable}
          onTap={onTap}
          rounding={rounding}
          selected={selected}
        >
          {children}
        </MaybeTapArea>
      </MaybeTooltip>
    </div>
  );
}
