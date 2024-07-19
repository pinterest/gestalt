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

  // console.log('inside item resize wrapper');
  // console.log({
  //   el: ref.current,
  //   resizeObserver,
  //   idx,
  // });

  useEffect(() => {
    const el = ref.current;
    if (resizeObserver && el) {
      // console.log('resize observer observing');
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
