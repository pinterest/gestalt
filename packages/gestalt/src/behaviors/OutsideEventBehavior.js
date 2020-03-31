// @flow
import type { Element } from 'react';
import React, { useCallback, useEffect, useRef } from 'react';

type Props = {|
  children: Element<*> | Array<Element<*>>,
  onClick?: (event: MouseEvent) => void,
|};

const OutsideEventBehavior = ({ children, onClick }: Props) => {
  const isClickedInside = useRef(false);
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
    document.addEventListener('click', handleDocumentClickEvent);
    return () => {
      document.removeEventListener('click', handleDocumentClickEvent);
    };
  }, [handleDocumentClickEvent]);

  const handleClick = () => {
    isClickedInside.current = true;
  };
  return <div onClickCapture={handleClick}>{children}</div>;
};

export default OutsideEventBehavior;
