// @flow strict
import { type Node as ReactNode, useEffect, useRef } from 'react';

type Props = {
  children: ReactNode,
  onClick?: (event: MouseEvent) => void,
};

export default function OutsideEventBehavior({ children, onClick }: Props): ReactNode {
  const element = useRef<?HTMLDivElement>(null);

  useEffect(() => {
    const handleClickEvent = (event: MouseEvent) => {
      if (
        !onClick ||
        !element ||
        (event.target instanceof Node && element.current && element.current.contains(event.target))
      ) {
        return;
      }
      onClick(event);
    };

    document.addEventListener('click', handleClickEvent, {
      capture: true,
    });
    return function cleanup() {
      document.removeEventListener('click', handleClickEvent, {
        capture: true,
      });
    };
  }, [onClick]);

  return <div ref={element}>{children}</div>;
}
