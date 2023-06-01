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

type Props = {|
  children?: Node | ((state: InteractionStates) => Node),
  disabled?: boolean,
  id?: string,
  rounding?: Rounding,
  selected?: boolean,
  onTap?: TileChangeHandler,
  outerContainerClass?: string,
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

/**
 * Used Internally to wrap a component with a Tile View
 */
export default function Tile({
  children,
  disabled = false,
  id = '',
  onTap,
  outerContainerClass,
  rounding = 4,
  selected = false,
  tooltip,
}: Props): Node {
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

  return (
    <div className={outerContainerClass}>
      <MaybeTooltip tooltip={tooltip} disabled={disabled}>
        <TapArea
          role="button"
          disabled={disabled}
          rounding={rounding}
          onBlur={handleOnBlur}
          onTap={handleClick}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
          onKeyDown={handleKeyDown}
          fullHeight
          fullWidth
        >
          {typeof children !== 'function' ? (
            <Box height="100%" width="100%" borderStyle="none">
              {children}
            </Box>
          ) : (
            children({ selected, hovered: isHovered && !isFocusVisible, disabled })
          )}
        </TapArea>
      </MaybeTooltip>
    </div>
  );
}
