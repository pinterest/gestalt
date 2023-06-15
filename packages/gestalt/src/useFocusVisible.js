// @flow strict

// Portions of the code in this file are based on code from react & react-spectrum:
// https://github.com/facebook/react/blob/cc7c1aece46a6b69b41958d731e0fd27c94bfc6c/packages/react-interactions/events/src/dom/create-event-handle/Focus.js
// https://github.com/adobe/react-spectrum/blob/c700898916bbd076bcc63e49d77c16d80623a8e7/packages/@react-aria/interactions/src/useFocusVisible.ts

import { useEffect, useState } from 'react';

type Modality = 'keyboard' | 'pointer';
type HandlerEvent = PointerEvent | MouseEvent | KeyboardEvent | FocusEvent;
type Handler = (modality: Modality, e: HandlerEvent) => void;

let hasSetupGlobalListeners = false;
let currentModality = null;
const changeHandlers = new Set<Handler>();
let hasEventBeforeFocus = false;

const isMac =
  typeof window !== 'undefined' && window.navigator != null
    ? /^Mac/.test(window.navigator.platform)
    : false;

function isValidKey(e: KeyboardEvent) {
  return !(e.metaKey || (!isMac && e.altKey) || e.ctrlKey);
}

function triggerChangeHandlers(modality: Modality, e: HandlerEvent) {
  changeHandlers.forEach((handler) => {
    handler(modality, e);
  });
}

function handleKeyboardEvent(e: KeyboardEvent) {
  hasEventBeforeFocus = true;
  if (isValidKey(e)) {
    currentModality = 'keyboard';
    triggerChangeHandlers('keyboard', e);
  }
}

function handlePointerEvent(e: PointerEvent | MouseEvent) {
  currentModality = 'pointer';
  if (e.type === 'mousedown' || e.type === 'pointerdown') {
    hasEventBeforeFocus = true;
    triggerChangeHandlers('pointer', e);
  }
}

function handleFocusEvent(e: FocusEvent) {
  // Firefox fires two extra focus events when the user first clicks into an iframe:
  // first on the window, then on the document. We ignore these events so they don't
  // cause keyboard focus rings to appear.
  if (e.target === window || e.target === document) {
    return;
  }

  // If a focus event occurs without a preceding keyboard or pointer event, switch to keyboard modality.
  // This occurs, for example, when navigating a form with the next/previous buttons on iOS.
  if (!hasEventBeforeFocus) {
    currentModality = 'keyboard';
    triggerChangeHandlers('keyboard', e);
  }

  hasEventBeforeFocus = false;
}

function handleWindowBlur() {
  // When the window is blurred, reset state. This is necessary when tabbing out of the window,
  // for example, since a subsequent focus event won't be fired.
  hasEventBeforeFocus = false;
}

function isFocusVisible(): boolean {
  return currentModality !== 'pointer';
}

function setupGlobalFocusEvents() {
  if (typeof window === 'undefined' || hasSetupGlobalListeners) {
    return;
  }

  // Programmatic focus() calls shouldn't affect the current input modality.
  // However, we need to detect other cases when a focus event occurs without
  // a preceding user event (e.g. screen reader focus). Overriding the focus
  // method on HTMLElement.prototype is a bit hacky, but works.
  // $FlowExpectedError[method-unbinding]
  const { focus } = HTMLElement.prototype;
  // $FlowFixMe[missing-local-annot]
  // $FlowFixMe[cannot-write]
  HTMLElement.prototype.focus = function focusElement(this: HTMLElement, ...args) {
    hasEventBeforeFocus = true;
    focus.apply(this, args);
  };

  document.addEventListener('keydown', handleKeyboardEvent, true);
  document.addEventListener('keyup', handleKeyboardEvent, true);

  // Register focus events on the window so they are sure to happen
  // before React's event listeners (registered on the document).
  window.addEventListener('focus', handleFocusEvent, true);
  window.addEventListener('blur', handleWindowBlur, false);

  if (typeof PointerEvent !== 'undefined') {
    document.addEventListener('pointerdown', handlePointerEvent, true);
    document.addEventListener('pointermove', handlePointerEvent, true);
    document.addEventListener('pointerup', handlePointerEvent, true);
  } else {
    document.addEventListener('mousedown', handlePointerEvent, true);
    document.addEventListener('mousemove', handlePointerEvent, true);
    document.addEventListener('mouseup', handlePointerEvent, true);
  }

  hasSetupGlobalListeners = true;
}

/**
 * https://gestalt.pinterest.systems/web/utilities/usefocusvisible
 */
export default function useFocusVisible(): {|
  isFocusVisible: boolean,
|} {
  setupGlobalFocusEvents();
  const [isFocusVisibleState, setFocusVisible] = useState(isFocusVisible());
  useEffect(() => {
    const handler = () => {
      setFocusVisible(isFocusVisible());
    };

    changeHandlers.add(handler);
    return () => {
      changeHandlers.delete(handler);
    };
  }, []);

  return { isFocusVisible: isFocusVisibleState };
}
