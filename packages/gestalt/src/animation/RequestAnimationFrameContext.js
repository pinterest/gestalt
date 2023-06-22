// @flow strict

import {
  type Context,
  createContext,
  type Element,
  type Node,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { ANIMATION_STATE, useAnimation } from './AnimationContext.js';
import useReducedMotion from '../useReducedMotion.js';

type RequestAnimationFrameProviderProps = {|
  children: Node,
|};

type RequestAnimationFrameType = {|
  handleRequestAnimationFrame: () => void,
  onExternalDismiss: () => void,
|};

// CONTEXT
const initialState = { handleRequestAnimationFrame: () => {}, onExternalDismiss: () => {} };

const RequestAnimationFrameContext: Context<RequestAnimationFrameType> =
  createContext<RequestAnimationFrameType>(initialState);

// HELPERS
// requestAnimationFrame
function getRequestAnimationFrame(callback: () => void): number {
  if (
    typeof window === 'undefined' ||
    // $FlowFixMe[method-unbinding]
    !Object.prototype.hasOwnProperty.call(window, 'requestAnimationFrame')
  ) {
    if (callback) {
      callback();
    }
  }

  /* the callback routine must itself call requestAnimationFrame() again to animate another frame at the next repaint. requestAnimationFrame() is 1 shot. */
  let requestId: number | null;
  /* update the requestId each time requestAnimationFrame is called */
  requestId = window.requestAnimationFrame(() => {
    requestId = window.requestAnimationFrame(() => {
      if (callback) {
        callback();
      }
    });
  });

  return requestId;
}
// cancelAnimationFrame
function cancelRequestAnimationFrame({
  requestAnimationFrameId,
}: {|
  requestAnimationFrameId: number | null,
|}): number | null {
  if (
    typeof window !== 'undefined' &&
    // $FlowFixMe[method-unbinding]
    Object.prototype.hasOwnProperty.call(window, 'cancelAnimationFrame') &&
    requestAnimationFrameId
  ) {
    /* the cancellation uses the last requestId */
    window.cancelAnimationFrame(requestAnimationFrameId);
    return null;
  }

  return requestAnimationFrameId;
}

// PROVIDER
export default function RequestAnimationFrameProvider({
  children,
}: RequestAnimationFrameProviderProps): Element<
  typeof RequestAnimationFrameContext.Provider,
> | null {
  const reducedMotion = useReducedMotion();
  const { animationState, setAnimationState, handleExternalDismiss } = useAnimation();
  const requestAnimationFrameId = useRef<null | number>(null);
  /*
  Summary to understand what event controls requestAnimationFrame during the lifecycle of the component
    "in" animation
      animation starts (requestAnimationFrame): useEffect (mounting)
      animation ends (cancelAnimationFrame): handleRequestAnimationFrame (onAnimationEnd)

    "out" animation
      animation starts (requestAnimationFrame): onExternalDismiss (onDismiss)
      animation ends (cancelAnimationFrame): useEffect (unmounting)
  */

  /*
  useEffect (mounting/unmounting)

    This useEffect controls requestAnimationFrame on the "in" animation when mounting and cancelAnimationFrame on the "out" animation when unmounting
  */
  useEffect(() => {
    // requestAnimationFrame manages the initial rendering of the component when component is animated
    requestAnimationFrameId.current = getRequestAnimationFrame(() => {
      if (!reducedMotion && !!requestAnimationFrameId.current) {
        setAnimationState?.(ANIMATION_STATE.animatedOpening);
      }
    });

    // On unmounting, cancelAnimationFrame always gets executed
    return () => {
      requestAnimationFrameId.current = cancelRequestAnimationFrame({
        requestAnimationFrameId: requestAnimationFrameId.current,
      });
    };
  }, [reducedMotion, setAnimationState]);

  /*
  onExternalDismiss (onDismiss)

    onExternalDismiss controls requestAnimationFrame for the "out" animation
    onExternalDismiss can be accessed via render props in the API (onDismissStart)
    handleExternalDismiss is ultimately the callback that triggers unmounting with/without animation externally
  */
  const onExternalDismiss = useCallback(() => {
    if (!reducedMotion) {
      requestAnimationFrameId.current = getRequestAnimationFrame(() => handleExternalDismiss());
    } else {
      handleExternalDismiss();
    }
  }, [reducedMotion, handleExternalDismiss]);

  /*
  handleRequestAnimationFrame (onAnimationEnd)

    handleRequestAnimationFrame controls cancelAnimationFrame only after the "in" animation ends, not after the "out" animation as the previous useEffect takes care of it when unmounting

    handleRequestAnimationFrame is only called within the onAnimationEnd event.

    handleAnimationEnd && handleRequestAnimationFrame are separate functions as handleRequestAnimationFrame only handles animations out, not both in/out
  */
  const handleRequestAnimationFrame = useCallback(() => {
    if (!reducedMotion && animationState === ANIMATION_STATE.animatedOpening) {
      requestAnimationFrameId.current = cancelRequestAnimationFrame({
        requestAnimationFrameId: requestAnimationFrameId.current,
      });
    }
  }, [animationState, reducedMotion]);

  // We don't put RequestAnimationFrameProvider within AnimationProvider to prevent circular dependencies
  return (
    <RequestAnimationFrameContext.Provider
      value={useMemo(
        () => ({ handleRequestAnimationFrame, onExternalDismiss }),
        [handleRequestAnimationFrame, onExternalDismiss],
      )}
    >
      {children}
    </RequestAnimationFrameContext.Provider>
  );
}

// HOOK
export function useRequestAnimationFrame(): RequestAnimationFrameType {
  return useContext(RequestAnimationFrameContext);
}
