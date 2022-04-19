// @flow strict
import { type Node, useReducer, useRef } from 'react';
import useDebouncedCallback from './useDebouncedCallback.js';
import Controller from './Controller.js';
import Text from './Text.js';
import Box from './Box.js';
import Layer from './Layer.js';
import { type Indexable } from './zIndex.js';

const noop = () => {};
const TIMEOUT = 100;

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
  /**
   * Label to provide more context around the Tooltip’s function or purpose. By default `text` is used but this prop allows you to override it. Learn more about when to override it in the [Accessibility](https://gestalt.pinterest.systems/tooltip#Labels) section.
   */
  accessibilityLabel?: string,
  /**
   * The anchor element, usually [Icon Button](https://gestalt.pinterest.systems/iconbutton), that triggers Tooltip on hover or focus.
   */
  children: Node,
  /**
   * Specifies the preferred position of Tooltip relative to its anchor element. See the [ideal direction](https://gestalt.pinterest.systems/tooltip#Ideal-direction) variant to learn more.
   */
  idealDirection?: 'up' | 'right' | 'down' | 'left',
  /**
   * Properly positions Tooltip relative to an inline element, such as [Icon Button](https://gestalt.pinterest.systems/iconbutton) using the inline property. See the [inline](https://gestalt.pinterest.systems/tooltip#Inline) variant to learn more.
   */
  inline?: boolean,
  /**
   * Displays a link at the bottom of Tooltip. See the [link](https://gestalt.pinterest.systems/tooltip#Link) variant to learn more.
   */
  link?: Node,
  /**
   * The text shown in Tooltip to describe its anchor element. See [localization ](https://gestalt.pinterest.systems/tooltip#Localization) to learn more.
   */
  text: string,
  /**
   * Specifies the stacking order of Tooltip along the z-axis in the current stacking context. See the [z-index](https://gestalt.pinterest.systems/tooltip#Z-index) variant to learn more.
   */
  zIndex?: Indexable,
|};

/**
 * [Tooltip](https://gestalt.pinterest.systems/tooltip) is a floating text label that succinctly describes the function of an interactive element, typically [Icon Button](/iconbutton). It’s displayed continuously as long as the user hovers over or focuses on the element.
 *
 * **Planning to use Tooltip with IconButton? Use [IconButton's built-in tooltip](/iconbutton#With-Tooltip) instead.**
 *
 * ![Tooltip light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/cypress/integration/visual-test/__image_snapshots__/Tooltip%20%230.png)
 * ![Tooltip dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/cypress/integration/visual-test/__image_snapshots__/Tooltip-dark%20%230.png)
 */
export default function Tooltip({
  accessibilityLabel,
  children,
  link,
  idealDirection = 'down',
  inline,
  text,
  zIndex,
}: Props): Node {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isOpen } = state;

  const childRef = useRef<?HTMLElement>(null);
  const { current: anchor } = childRef;

  const mouseLeaveDelay = link ? TIMEOUT : 0;

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
        aria-label={accessibilityLabel != null ? accessibilityLabel : text}
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

Tooltip.displayName = 'Tooltip';
