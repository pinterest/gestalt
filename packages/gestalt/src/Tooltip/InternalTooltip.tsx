import { Fragment, ReactNode, useEffect, useReducer, useRef } from 'react';
import Box from '../Box';
import Layer from '../Layer';
import Controller from '../Popover/Controller';
import Text from '../Text';
import useDebouncedCallback from '../useDebouncedCallback';
import { Indexable } from '../zIndex';

const noop = () => {};
const TIMEOUT = 100;

const initialState = { hoveredIcon: false, hoveredText: false, isOpen: false } as const;

const reducer = (
  state: {
    hoveredIcon: boolean;
    hoveredText: boolean;
    isOpen: boolean;
  },
  action: {
    type: 'hoverInIcon' | 'hoverInText' | 'hoverOutIcon' | 'hoverOutText';
    disabled?: boolean;
  },
) => {
  if (action.disabled) return { ...state, isOpen: false, hoveredIcon: false, hoveredText: false };
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

type Props = {
  accessibilityLabel?: string;
  children?: ReactNode;
  dataTestId?: string;
  /**
   * Whether to show the tooltip or not
   */
  disabled?: boolean;
  idealDirection?: 'up' | 'right' | 'down' | 'left';
  inline?: boolean;
  link?: ReactNode;
  text: string | ReadonlyArray<string>;
  zIndex?: Indexable;
};

export default function InternalTooltip({
  accessibilityLabel,
  children,
  dataTestId,
  disabled,
  link,
  idealDirection,
  inline,
  text,
  zIndex,
}: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isOpen } = state;

  const childRef = useRef<HTMLElement | null>(null);
  const { current: anchor } = childRef;

  const mouseLeaveDelay = link ? TIMEOUT : 0;

  useEffect(() => {
    if (disabled === true) {
      dispatch({ type: 'hoverOutIcon', disabled });
    }
  }, [disabled]);

  const handleIconMouseEnter = () => {
    dispatch({ type: 'hoverInIcon', disabled });
  };

  const handleIconMouseLeave = useDebouncedCallback(() => {
    dispatch({ type: 'hoverOutIcon', disabled });
  }, mouseLeaveDelay);

  const handleTextMouseEnter = () => {
    dispatch({ type: 'hoverInText', disabled });
  };

  const handleTextMouseLeave = useDebouncedCallback(() => {
    dispatch({ type: 'hoverOutText', disabled });
  }, mouseLeaveDelay);

  const getTooltipText = () => {
    if (Array.isArray(text)) {
      // first and last line should not have a <p> tag, (adds extra padding)
      const lines = text.map((line, idx) => {
        if (typeof line !== 'string') return '';

        return text.length === 1 || idx === text.length - 1 ? (
          line
        ) : (
          <Fragment>
            {line} <br /> <br />
          </Fragment>
        );
      });
      return lines;
    }
    return text;
  };

  const accessibilityLabelFallback = typeof text === 'string' ? text : text.join('');

  return (
    <Box display={inline ? 'inlineBlock' : 'block'}>
      <Box
        ref={childRef}
        aria-label={
          accessibilityLabel != null && !disabled ? accessibilityLabel : accessibilityLabelFallback
        }
        data-test-id={dataTestId}
        onBlur={handleIconMouseLeave}
        onFocus={handleIconMouseEnter}
        onMouseEnter={handleIconMouseEnter}
        onMouseLeave={handleIconMouseLeave}
      >
        {children}
      </Box>
      {isOpen && !!anchor && (
        <Layer zIndex={zIndex}>
          <Controller
            anchor={anchor}
            bgColor="darkGray"
            border={false}
            caret={false}
            disablePortal
            hideWhenReferenceHidden
            idealDirection={idealDirection}
            onDismiss={noop}
            role="tooltip"
            rounding={2}
            shouldFocus={false}
          >
            <Box
              maxWidth={180}
              onBlur={link ? handleTextMouseLeave : undefined}
              onFocus={link ? handleTextMouseEnter : undefined}
              onMouseEnter={link ? handleTextMouseEnter : undefined}
              onMouseLeave={link ? handleTextMouseLeave : undefined}
              padding={2}
              tabIndex={0}
            >
              <Text color="inverse" dataTestId={dataTestId} size="100">
                {getTooltipText()}
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
