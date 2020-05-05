// @flow strict

import * as React from 'react';
import Controller from './Controller.js';
import Text from './Text.js';
import Box from './Box.js';
import Layer from './Layer.js';

const noop = () => {};
const TIMEOUT = 100;

type Props = {|
  children: React.Node,
  link?: React.Node,
  idealDirection?: 'up' | 'right' | 'down' | 'left',
  inline?: boolean,
  text: string,
|};

const initialState = { hoveredIcon: false, hoveredText: false, isOpen: false };

const reducer = (state, action) => {
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
        ...(!state.hoveredText ? { isOpen: false } : {}),
      };
    case 'hoverOutText':
      return {
        ...state,
        hoveredText: false,
        ...(!state.hoveredIcon ? { isOpen: false } : {}),
      };
    default:
      throw new Error();
  }
};

export default function Tooltip({
  children,
  link,
  idealDirection = 'down',
  inline,
  text,
}: Props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { isOpen } = state;

  const childRef = React.useRef<?HTMLDivElement>(null);
  const { current: anchor } = childRef;

  const handleIconMouseEnter = () => {
    dispatch({ type: 'hoverInIcon' });
  };

  const handleIconMouseLeave = () => {
    setTimeout(() => {
      dispatch({ type: 'hoverOutIcon' });
    }, TIMEOUT);
  };

  const handleTextMouseEnter = () => {
    dispatch({ type: 'hoverInText' });
  };

  const handleTextMouseLeave = () => {
    setTimeout(() => {
      dispatch({ type: 'hoverOutText' });
    }, TIMEOUT);
  };

  return (
    <Box display={inline ? 'inlineBlock' : 'block'}>
      <Box
        aria-label={text}
        ref={childRef}
        onFocus={handleIconMouseEnter}
        onBlur={handleIconMouseLeave}
        onMouseEnter={handleIconMouseEnter}
        onMouseLeave={handleIconMouseLeave}
      >
        {children}
      </Box>
      {isOpen && !!anchor && (
        <Layer>
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
              <Text color="white" size="sm">
                {text}
              </Text>
              {link && <Box marginTop={1}>{link}</Box>}
            </Box>
          </Controller>
        </Layer>
      )}
    </Box>
  );
}
