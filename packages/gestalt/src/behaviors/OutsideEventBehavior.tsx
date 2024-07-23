import { ReactNode, useEffect, useRef } from 'react';

type Props = {
  children: ReactNode;
  dataTestId?: string;
  onClick?: (event: MouseEvent) => void;
};

export default function OutsideEventBehavior({ children, onClick, dataTestId }: Props) {
  const element = useRef<HTMLDivElement | null | undefined>(null);

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

  return (
    // @ts-expect-error - TS2322 - Type 'MutableRefObject<HTMLDivElement | null | undefined>' is not assignable to type 'LegacyRef<HTMLDivElement> | undefined'.
    <div ref={element} data-test-id={dataTestId}>
      {children}
    </div>
  );
}
