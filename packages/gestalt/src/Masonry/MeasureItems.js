// @flow strict
import { Fragment, type Node, useLayoutEffect, useMemo } from 'react';
import { type Cache } from './Cache.js';
import { type Position } from './types.js';

const layoutNumberToCssDimension = (n) => (n !== Infinity ? n : undefined);

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
  const refs = useMemo(() => new Map(), []);

  useLayoutEffect(() => {
    if (refs.size === items.length) {
      refs.forEach((el, data) => {
        measurementStore.set(data, el.clientHeight);
      });
    }
  }, [items.length, measurementStore, refs]);

  return (
    <Fragment>
      {items.map((data, i) => {
        // itemsToMeasure is always the length of minCols, so i will always be 0..minCols.length
        // we normalize the index here relative to the item list as a whole so that itemIdx is correct
        // and so that React doesnt reuse the measurement nodes
        const measurementIndex = baseIndex + i;
        const position = measuringPositions[i];
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
                // measurementStore.set(data, el.clientHeight);
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
