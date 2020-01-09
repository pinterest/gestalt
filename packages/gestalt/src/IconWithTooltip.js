// @flow

import * as React from 'react';
import Controller from './Controller.js';
import Text from './Text.js';
import Box from './Box.js';
import Link from './Link.js';
import Icon from './Icon.js';
import icons from './icons/index.js';
import Touchable from './Touchable.js';

const noop = () => {};

type Props = {|
  accessibilityLabel: string,
  icon?: $Keys<typeof icons>,
  inline?: boolean,
  href?: string,
  hrefText?: string,
  tooltipText: string,
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

export default function IconWithTooltip({
  accessibilityLabel,
  icon,
  inline,
  tooltipText,
  href,
  hrefText,
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
    }, 75);
  };

  const handleTextMouseEnter = () => {
    dispatch({ type: 'hoverInText' });
  };

  const handleTextMouseLeave = () => {
    setTimeout(() => {
      dispatch({ type: 'hoverOutText' });
    }, 75);
  };

  return (
    <Box
      display={inline ? 'inlineBlock' : 'block'}
      ref={childRef}
      onMouseEnter={handleIconMouseEnter}
      onMouseLeave={handleIconMouseLeave}
      onFocus={handleIconMouseEnter}
      onBlur={handleIconMouseLeave}
    >
      <Touchable onTouch={handleIconMouseEnter} shape="rounded">
        <Icon
          color={isOpen ? 'darkGray' : 'gray'}
          icon={icon}
          accessibilityLabel={accessibilityLabel}
        />
      </Touchable>

      {isOpen && !!anchor && (
        <Controller
          anchor={anchor}
          bgColor="darkGray"
          caret={false}
          idealDirection="down"
          onDismiss={noop}
          positionRelativeToAnchor
          size={null}
        >
          <Box
            maxWidth={180}
            onBlur={handleTextMouseLeave}
            onFocus={handleTextMouseEnter}
            onMouseEnter={handleTextMouseEnter}
            onMouseLeave={handleTextMouseLeave}
            paddingX={2}
            paddingY={1}
            role="tooltip"
            tabIndex={0}
          >
            <Text color="white" size="xs">
              {tooltipText}
            </Text>
            {href && hrefText && (
              <Box paddingY={1} role="link">
                <Link href={href}>
                  <Text color="white" size="xs" weight="bold">
                    {hrefText}
                  </Text>
                </Link>
              </Box>
            )}
          </Box>
        </Controller>
      )}
    </Box>
  );
}
