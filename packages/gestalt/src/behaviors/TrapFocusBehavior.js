// @flow strict
import { useEffect, useRef, type Node as ReactNode } from 'react';

type Props = {|
  children?: ReactNode,
|};

function queryFocusableAll(el: HTMLDivElement) {
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
  // $FlowFixMe[method-unbinding]
  if (typeof el.focus === 'function') {
    el.focus();
  }
};

export default function TrapFocusBehavior({ children }: Props): ReactNode {
  const elRef = useRef<?HTMLDivElement>(null);
  const previouslyFocusedElRef = useRef<?HTMLElement>(null);

  const setElRef: (el: ?HTMLDivElement) => void = (el: ?HTMLDivElement) => {
    if (el) {
      elRef.current = el;
    }
  };

  useEffect(() => {
    const { current: element } = elRef;
    const focusFirstChild = () => {
      if (element) {
        focusElement(queryFocusableAll(element)[0]);
      }
    };

    const handleFocus: (event: FocusEvent) => void = (event: FocusEvent) => {
      if (!element || (event.target instanceof Node && element.contains(event.target))) {
        return;
      }

      if (event.target instanceof Element && event.target.closest('[name="trap-focus"]') !== null) {
        return;
      }

      event.stopPropagation();
      event.preventDefault();
      focusFirstChild();
    };

    previouslyFocusedElRef.current = document.activeElement;
    focusFirstChild();
    document.addEventListener('focus', handleFocus, true);
    return function cleanup() {
      const { current: previouslyFocusedEl } = previouslyFocusedElRef;
      document.removeEventListener('focus', handleFocus, true);
      if (previouslyFocusedEl) {
        focusElement(previouslyFocusedEl);
      }
    };
  }, [elRef, previouslyFocusedElRef]);

  return (
    <div name="trap-focus" ref={setElRef}>
      {children}
    </div>
  );
}
