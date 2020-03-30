// @flow
import type { Element } from 'react';
import React, { useEffect } from 'react';

type Props = {|
  children: Element<*> | Array<Element<*>>,
  onClick?: (event: MouseEvent) => void,
|};

const OutsideEventBehavior = ({ children, onClick }: Props) => {
  let isClickedInside = false;
  const handleDocumentClickEvent = (event: MouseEvent) => {
    if (isClickedInside) {
      isClickedInside = false;
      return;
    }
    if (onClick) {
      onClick(event);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClickEvent);
    return () => {
      document.removeEventListener('click', handleDocumentClickEvent);
    };
  });

  const handleClick = () => {
    isClickedInside = true;
  };
  return <div onClickCapture={handleClick}>{children}</div>;
};

export default OutsideEventBehavior;
