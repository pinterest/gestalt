import { ReactNode, useEffect, useRef } from 'react';

type Props = {
  children?: ReactNode;
};

function queryFocusableAll(el: HTMLDivElement) {
  // Focusable, interactive elements that could possibly be in children
  const selector = [
    'a[href]',
    'area[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'button:not([disabled])',
    'iframe',
    'object',
    'embed',
    '[tabindex="-1"]',
    '[tabindex="0"]',
    '[contenteditable]',
    'audio[controls]',
    'video[controls]',
    'summary',
  ].join(',');
  return el.querySelectorAll(selector);
}

const focusElement = (el: HTMLElement) => {
  // https://github.com/facebook/flow/issues/8705
  if (typeof el.focus === 'function') {
    el.focus();
  }
};

/**
 * TrapFocusBehavior is used by components like Modal and OverlayPanel to ensure that only elements within children components can be focused.
 */
export default function TrapFocusBehavior({ children }: Props) {
  const elRef = useRef<HTMLDivElement | null | undefined>(null);
  const previouslyFocusedElRef = useRef<HTMLElement | null | undefined>(null);

  const setElRef: (el?: HTMLDivElement | null | undefined) => void = (
    el?: HTMLDivElement | null,
  ) => {
    if (el) {
      elRef.current = el;
    }
  };

  useEffect(() => {
    const { current: element } = elRef;

    // Focus the first child element among all the focusable, interactive elements within `children`
    const focusFirstChild = () => {
      const withinIframe = window !== window.parent;
      if (element && !withinIframe) {
// @ts-expect-error - TS2345 - Argument of type 'Element' is not assignable to parameter of type 'HTMLElement'.
        focusElement(queryFocusableAll(element)[0]);
      }
    };

    const handleFocus: (event: FocusEvent) => void = (event: FocusEvent) => {
      if (!element || (event.target instanceof Node && element.contains(event.target))) {
        return;
      }

      // This prevents stack overflow when multiple TrapFocusBehaviors are rendered
      if (event.target instanceof Element && event.target.closest('[name="trap-focus"]') !== null) {
        return;
      }

      event.stopPropagation();
      event.preventDefault();
      focusFirstChild();
    };

    // If an element has focus currently, keep a reference to that element
// @ts-expect-error - TS2322 - Type 'Element | null' is not assignable to type 'HTMLElement | null | undefined'.
    previouslyFocusedElRef.current = document.activeElement;
    focusFirstChild();
    document.addEventListener('focus', handleFocus, true);

    return function cleanup() {
      const { current: previouslyFocusedEl } = previouslyFocusedElRef;
      document.removeEventListener('focus', handleFocus, true);
      // If we previously stored a reference to a focused element, return focus to that element
      if (previouslyFocusedEl) {
        focusElement(previouslyFocusedEl);
      }
    };
  }, [elRef, previouslyFocusedElRef]);

  return (
// @ts-expect-error - TS2322 - Type '{ children: ReactNode; ref: (el?: HTMLDivElement | null | undefined) => void; name: string; }' is not assignable to type 'DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>'.
    <div ref={setElRef} name="trap-focus">
      {children}
    </div>
  );
}
