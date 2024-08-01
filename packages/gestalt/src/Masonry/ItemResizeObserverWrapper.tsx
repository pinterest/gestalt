import { ReactNode, useRef } from 'react';
import useIsomorphicLayoutEffect from '../useIsomorphicLayoutEffect';

function ItemResizeObserverWrapper({
  resizeObserver,
  idx,
  children,
}: {
  resizeObserver: ResizeObserver | undefined;
  idx: number;
  children: ReactNode;
}) {
  const ref = useRef(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (resizeObserver && el) {
      resizeObserver.observe(el);
    }

    return () => {
      if (resizeObserver && el) {
        resizeObserver.unobserve(el);
      }
    };
  }, [resizeObserver]);

  return (
    <div ref={ref} data-grid-item-idx={idx}>
      {children}
    </div>
  );
}

export default ItemResizeObserverWrapper;
