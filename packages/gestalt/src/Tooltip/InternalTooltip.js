// @flow strict
import { type Node, useEffect, useReducer, useRef } from 'react';
import Box from '../Box.js';
import Controller from '../Controller.js';
import Layer from '../Layer.js';
import Text from '../Text.js';
import useDebouncedCallback from '../useDebouncedCallback.js';
import { type Indexable } from '../zIndex.js';

const noop = () => {};
const TIMEOUT = 100;

const initialState = { hoveredIcon: false, hoveredText: false, isOpen: false };

const reducer = (
  state: {| hoveredIcon: boolean, hoveredText: boolean, isOpen: boolean |},
  action: {|
    type: 'hoverInIcon' | 'hoverInText' | 'hoverOutIcon' | 'hoverOutText',
    disabled?: boolean,
  |},
) => {
  if (action.disabled) return { ...state, isOpen: false, hoveredIcon: false };
  switch (action.type) {
    case 'hoverInIcon':
      return {
        ...state,
        hoveredIcon: true,
        isOpen: true,
      };
    case 'hoverInText':
      return {
        ...state,
        hoveredText: true,
        isOpen: true,
      };
    case 'hoverOutIcon':
      return {
        ...state,
        hoveredIcon: false,
        isOpen: !state.hoveredText ? false : state.isOpen,
      };
    case 'hoverOutText':
      return {
        ...state,
        hoveredText: false,
        isOpen: !state.hoveredIcon ? false : state.isOpen,
      };
    default:
      throw new Error();
  }
};

type Props = {|
  accessibilityLabel?: string,
  children?: Node,
  /**
   * Whether to show the tooltip or not
   */
  disabled?: boolean,
  idealDirection?: 'up' | 'right' | 'down' | 'left',
  inline?: boolean,
  link?: Node,
  text: string,
  zIndex?: Indexable,
|};

export default function InternalTooltip({
  accessibilityLabel,
  children,
  disabled,
  link,
  idealDirection,
  inline,
  text,
  zIndex,
}: Props): Node {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isOpen } = state;

  const childRef = useRef<?HTMLElement>(null);
  const { current: anchor } = childRef;

  const mouseLeaveDelay = link ? TIMEOUT : 0;

  useEffect(() => {
    dispatch({ type: 'hoverOutIcon', disabled });
  }, [disabled]);

  const handleIconMouseEnter = () => {
    dispatch({ type: 'hoverInIcon' });
  };

  const handleIconMouseLeave = useDebouncedCallback(() => {
    dispatch({ type: 'hoverOutIcon' });
  }, mouseLeaveDelay);

  const handleTextMouseEnter = () => {
    dispatch({ type: 'hoverInText' });
  };

  const handleTextMouseLeave = useDebouncedCallback(() => {
    dispatch({ type: 'hoverOutText' });
  }, mouseLeaveDelay);

  return (
    <Box display={inline ? 'inlineBlock' : 'block'}>
      <Box
        aria-label={accessibilityLabel != null && !disabled ? accessibilityLabel : text}
        ref={childRef}
        onFocus={handleIconMouseEnter}
        onBlur={handleIconMouseLeave}
        onMouseEnter={handleIconMouseEnter}
        onMouseLeave={handleIconMouseLeave}
      >
        {children}
      </Box>
      {isOpen && !!anchor && (
        <Layer zIndex={zIndex}>
          <Controller
            anchor={anchor}
            caret={false}
            bgColor="darkGray"
            border={false}
            idealDirection={idealDirection}
            onDismiss={noop}
            positionRelativeToAnchor={false}
            rounding={2}
            size={null}
          >
            <Box
              maxWidth={180}
              padding={2}
              onBlur={link ? handleTextMouseLeave : undefined}
              onFocus={link ? handleTextMouseEnter : undefined}
              onMouseEnter={link ? handleTextMouseEnter : undefined}
              onMouseLeave={link ? handleTextMouseLeave : undefined}
              role="tooltip"
              tabIndex={0}
            >
              <Text color="inverse" size="100">
                {text}
              </Text>
              {Boolean(link) && <Box marginTop={1}>{link}</Box>}
            </Box>
          </Controller>
        </Layer>
      )}
    </Box>
  );
}

InternalTooltip.displayName = 'InternalTooltip';
