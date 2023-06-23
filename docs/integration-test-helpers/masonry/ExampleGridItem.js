// @flow strict
import { type Element, useEffect, useState } from 'react';

type Props = {|
  // $FlowFixMe[unclear-type]
  data: Object,
  expanded: boolean,
  itemIdx: number,
|};

export default function ExampleGridItem({ data = {}, itemIdx, expanded }: Props): Element<'div'> {
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    const mountCount = window.ITEM_MOUNT_COUNT || 0;
    window.ITEM_MOUNT_COUNT = mountCount + 1;
  }, []);

  function incrementStateCounter() {
    setCounter((prevCounter) => prevCounter + 1);
  }

  const isTwoColItem = data.columnSpan === 2;

  return (
    <div
      style={{
        padding: '0 7px 14px',
      }}
    >
      <div
        style={{
          height: expanded ? data.height + 100 : data.height,
          border: '1px solid #ff0000',
          background: isTwoColItem ? 'black' : data.color,
          color: isTwoColItem ? 'white' : undefined,
        }}
      >
        <div>
          {data.name} • {data.height}px
          {isTwoColItem ? ` • columnSpan: ${data.columnSpan}` : ''}
        </div>
        <div>Slot Index: {itemIdx}</div>
        <div>
          <button id={`increment-counter-${itemIdx}`} onClick={incrementStateCounter} type="button">
            Increment counter:
          </button>
          {'(Current '}
          <span id={`item-counter-${itemIdx}`}>{counter}</span>)
        </div>
      </div>
    </div>
  );
}
