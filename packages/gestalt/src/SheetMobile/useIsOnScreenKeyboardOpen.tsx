import { useEffect, useState } from 'react';

const isKeyboardInput = (elem: HTMLElement) => {
  // eslint-disable-next-line no-console
  console.log(elem);
  return (
    (elem.tagName === 'INPUT' &&
      ['date', 'number', 'email', 'password', 'tel', 'text', 'url'].includes(
        (elem as HTMLInputElement).type,
      )) ||
    elem.hasAttribute('contenteditable')
  );
};
const useIsOnScreenKeyboardOpen = () => {
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    const handleFocusIn = (e: FocusEvent) => {
      if (!e.target) {
        return;
      }
      const target = e.target as HTMLElement;
      if (isKeyboardInput(target)) {
        setOpen(true);
      }
    };

    document.addEventListener('focusin', handleFocusIn);

    const handleFocusOut = (e: FocusEvent) => {
      if (!e.target) {
        return;
      }
      const target = e.target as HTMLElement;
      if (isKeyboardInput(target)) {
        setOpen(false);
      }
    };

    document.addEventListener('focusout', handleFocusOut);

    return () => {
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
    };
  }, []);

  return isOpen;
};

export default useIsOnScreenKeyboardOpen;
