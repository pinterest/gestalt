// @flow strict
import { Fragment, type Node, useLayoutEffect, useMemo } from 'react';
import { type Cache } from './Cache.js';
import { type Position } from './types.js';

const layoutNumberToCssDimension = (n: number) => (n !== Infinity ? n : undefined);

type Props<T> = {|
  baseIndex: number,
  getPositions: (items: $ReadOnlyArray<T>) => $ReadOnlyArray<Position>,
  items: $ReadOnlyArray<T>,
  measurementStore: Cache<T, number>,
  renderItem: ({|
    +data: T,
    +itemIdx: number,
    +isMeasuring: boolean,
  |}) => Node,
|};

export default function MeasureItems<T>({
  baseIndex,
  getPositions,
  items,
  measurementStore,
  renderItem,
}: Props<T>): Node {
  const measuringPositions = getPositions(items);
  // $FlowFixMe[underconstrained-implicit-instantiation]
  const refs = useMemo(() => new Map(), []);
  // Need a separate variable for use in useLayoutEffect's dependency array
  const refsSize = refs.size;

  useLayoutEffect(() => {
    // Do we have a full batch of refs?
    if (refsSize === items.length) {
      // Measure all the refs
      const heights = new Map<T, number>();
      refs.forEach((el, data) => {
        heights.set(data, el.clientHeight);
      });
      // Store the measurements, which should trigger a paint
      heights.forEach((height, data) => {
        measurementStore.set(data, height);
      });
      // We're done with this batch, so clear the way for the next one
      refs.clear();
    }
  }, [items.length, measurementStore, refs, refsSize]);

  return (
    <Fragment>
      {items.map((data, index) => {
        // items is always the length of minCols, so index will always be 0..minCols.length
        // we normalize the index here relative to the item list as a whole so that itemIdx is correct
        // and so that React doesnt reuse the measurement nodes
        const measurementIndex = baseIndex + index;
        const position = measuringPositions[index];
        return (
          <div
            key={`measuring-${measurementIndex}`}
            style={{
              visibility: 'hidden',
              position: 'absolute',
              top: layoutNumberToCssDimension(position.top),
              left: layoutNumberToCssDimension(position.left),
              width: layoutNumberToCssDimension(position.width),
              height: layoutNumberToCssDimension(position.height),
            }}
            ref={(el) => {
              if (el) {
                refs.set(data, el);
              }
            }}
          >
            {renderItem({ data, itemIdx: measurementIndex, isMeasuring: true })}
          </div>
        );
      })}
    </Fragment>
  );
}
