// @flow
import type { Element } from 'react';
import React, { useCallback, useEffect, useRef } from 'react';

type Props = {|
  children: Element<*> | Array<Element<*>>,
  onClick?: (event: MouseEvent) => void,
|};

const OutsideEventBehavior = ({ children, onClick }: Props) => {
  const isClickedInside = useRef(false);

  const refreshClick = useCallback(() => {
    isClickedInside.current = false;
  }, []);

  const handleDocumentClickEvent = useCallback(
    (event: MouseEvent) => {
      if (isClickedInside.current) {
        isClickedInside.current = false;
        return;
      }
      if (onClick) {
        onClick(event);
      }
    },
    [onClick]
  );

  useEffect(() => {
    document.addEventListener('click', refreshClick, { capture: true });
    document.addEventListener('click', handleDocumentClickEvent);
    return () => {
      document.removeEventListener('click', refreshClick, { capture: true });
      document.removeEventListener('click', handleDocumentClickEvent);
    };
  }, [refreshClick, handleDocumentClickEvent]);

  const handleClick = () => {
    isClickedInside.current = true;
  };
  return <div onClickCapture={handleClick}>{children}</div>;
};

export default OutsideEventBehavior;
