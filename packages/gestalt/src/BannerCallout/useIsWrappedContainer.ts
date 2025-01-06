import { useCallback, useEffect, useState } from 'react';

const useIsWrappedContainer = (
  wrappedRef: React.MutableRefObject<HTMLDivElement | null>,
  checkWrapped: boolean,
) => {
  const [isWrapped, setIsWrapped] = useState(false);

  const checkWrappedButton = useCallback(() => {
    if (wrappedRef.current && !isWrapped && wrappedRef.current.offsetTop > 0) {
      setIsWrapped(true);
    } else if (wrappedRef.current && isWrapped && !(wrappedRef.current.offsetTop > 0)) {
      setIsWrapped(false);
    }
  }, [isWrapped, wrappedRef]);

  useEffect(() => {
    if (checkWrapped) {
      checkWrappedButton();

      if (typeof window !== 'undefined') window.addEventListener('resize', checkWrappedButton);
    }

    return () => {
      if (checkWrapped && typeof window !== 'undefined')
        window?.removeEventListener('resize', checkWrappedButton);
    };
  }, [checkWrappedButton, checkWrapped]);

  return isWrapped;
};

export default useIsWrappedContainer;
