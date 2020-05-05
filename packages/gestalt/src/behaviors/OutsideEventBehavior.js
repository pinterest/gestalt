// @flow strict
import * as React from 'react';

type Props = {|
  children: React.Node,
  onClick?: (event: MouseEvent) => void,
|};

export default function OutsideEventBehavior({ children, onClick }: Props) {
  const element = React.useRef<?HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickEvent = (event: MouseEvent) => {
      if (
        !onClick ||
        !element ||
        (event.target instanceof Node &&
          element.current &&
          element.current.contains(event.target))
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
