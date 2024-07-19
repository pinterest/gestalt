import { ReactNode, useEffect, useRef } from 'react';

function ItemResizeObserverWrapper({
  resizeObserver,
  idx,
  children,
}: {
  resizeObserver: any;
  idx: number;
  children: ReactNode;
}) {
  const ref = useRef(null);

  useEffect(() => {
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
