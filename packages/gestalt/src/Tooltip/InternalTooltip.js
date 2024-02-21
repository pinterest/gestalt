// @flow strict
import { Fragment, type Node as ReactNode, useEffect, useReducer, useRef } from 'react';
import Box from '../Box';
import Layer from '../Layer';
import LegacyController from '../LegacyController';
import Controller from '../Popover/Controller';
import Text from '../Text';
import useDebouncedCallback from '../useDebouncedCallback';
import useInExperiment from '../useInExperiment';
import { type Indexable } from '../zIndex';

const noop = () => {};
const TIMEOUT = 100;

const initialState = { hoveredIcon: false, hoveredText: false, isOpen: false };

const reducer = (
  state: { hoveredIcon: boolean, hoveredText: boolean, isOpen: boolean },
  action: {
    type: 'hoverInIcon' | 'hoverInText' | 'hoverOutIcon' | 'hoverOutText',
    disabled?: boolean,
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
  accessibilityLabel?: string,
  children?: ReactNode,
  /**
   * Whether to show the tooltip or not
   */
  disabled?: boolean,
  idealDirection?: 'up' | 'right' | 'down' | 'left',
  inline?: boolean,
  link?: ReactNode,
  text: string | $ReadOnlyArray<string>,
  zIndex?: Indexable,
  hideWhenReferenceHidden?: boolean,
};

export default function InternalTooltip({
  accessibilityLabel,
  children,
  disabled,
  link,
  idealDirection,
  inline,
  text,
  zIndex,
  hideWhenReferenceHidden,
}: Props): ReactNode {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isOpen } = state;

  const childRef = useRef<?HTMLElement>(null);
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

  const isInExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_tooltip_v2',
    mwebExperimentName: 'mweb_gestalt_tooltip_v2',
  });

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
          {isInExperiment ? (
            <Controller
              anchor={anchor}
              caret={false}
              bgColor="darkGray"
              border={false}
              idealDirection={idealDirection}
              onDismiss={noop}
              disablePortal
              rounding={2}
              size={null}
              shouldFocus={false}
              hideWhenReferenceHidden={hideWhenReferenceHidden}
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
                  {getTooltipText()}
                </Text>

                {Boolean(link) && <Box marginTop={1}>{link}</Box>}
              </Box>
            </Controller>
          ) : (
            <LegacyController
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
                  {getTooltipText()}
                </Text>

                {Boolean(link) && <Box marginTop={1}>{link}</Box>}
              </Box>
            </LegacyController>
          )}
        </Layer>
      )}
    </Box>
  );
}

InternalTooltip.displayName = 'InternalTooltip';
