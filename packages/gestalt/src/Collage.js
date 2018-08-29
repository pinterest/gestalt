// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import Collection from './Collection.js';

type Column = 2 | 3 | 4;

/*

This function just implements the design constraints for asymetrical columns in
a very simple way. It's not perfect, but it's very predictible. If you do
anything, improve it so that it takes these constraints and generates them
for n > 4.

1 + n columns:
  first column is 50/50
  can't have 3 columns in a row be 50/50

*/
const UP = [0.75, 0.25];
const DOWN = [0.25, 0.75];
const MID = [0.5, 0.5];
const columnLayout = (numOfColumns: 1 | Column) => {
  switch (numOfColumns) {
    case 1:
      return [[MID], [UP], [DOWN]];
    case 2:
      return [[UP, MID], [DOWN, MID], [MID, UP], [MID, DOWN]];
    case 4:
      return [
        [MID, UP, MID, MID],
        [MID, DOWN, MID, MID],
        [MID, MID, UP, MID],
        [MID, MID, DOWN, MID],
        [MID, UP, MID, DOWN],
        [MID, DOWN, MID, UP],
      ];
    case 3:
    default:
      return [
        [MID, UP, MID],
        [MID, DOWN, MID],
        [MID, MID, UP],
        [MID, MID, DOWN],
      ];
  }
};

const paddingAll = (gutter, positions) =>
  positions.map(({ top, left, width, height }) => ({
    top,
    left,
    width: width - gutter,
    height: height - gutter,
  }));

const mindex = arr =>
  arr.reduce((minIndex, item, i) => (item < arr[minIndex] ? i : minIndex), 0);

const columnsForCollageWithCover = (numOfColumns: Column) =>
  numOfColumns === 4 ? 2 : 1;

function getCollageLayout({
  gutter,
  cover,
  columns: numCols,
  height: h,
  width: w,
  layoutKey,
}: {
  gutter: number,
  cover: boolean,
  columns: Column,
  height: number,
  width: number,
  layoutKey: number,
}) {
  let positions = [];
  const width = w + gutter;
  const height = h + gutter;

  // If there's a cover image, we'll add that later. It should be a little
  // less than half the width of the collage. We do this now (and not later
  // when we add the cover image) because of `columnLayout`'s constraints
  // needing the exact number of columns that are displayed.
  const gridCols = cover ? columnsForCollageWithCover(numCols) : numCols;

  // Selects the layout that we're going to use for the grid
  const columns = columnLayout(gridCols);
  const layoutIdx = layoutKey % columns.length;
  const layout = columns[layoutIdx];

  // This does a really simple version of our masonry layout. Why replicate
  // that here? a.) fewer dependencies and b.) we need the algorithm to
  // roughly preserve the order of the collages from when they were ordered
  // by Masonry.
  const colHeights = new Array(gridCols).fill(0);
  const colCounts = new Array(gridCols).fill(0);

  // We iterate over every position that we think we could _potentially_ have
  // so that we can fill them with empty sections if need be.
  for (let i = 0; i < 2 * gridCols; i += 1) {
    const col = mindex(colHeights);
    const colIdx = colCounts[col];
    const itemHeight = layout[col][colIdx] * height;

    positions.push({
      top: colHeights[col],
      left: col * (width / numCols),
      width: width / numCols,
      height: itemHeight,
    });

    colHeights[col] += itemHeight;
    colCounts[col] += 1;
  }

  // If we have a cover image, figure out how big it is, then move all the
  // existing columns over.
  if (cover) {
    const coverImageWidth = Math.ceil(numCols / 2) * (width / numCols);
    positions = positions.map(position => ({
      ...position,
      left: coverImageWidth + position.left,
    }));
    positions.unshift({ top: 0, left: 0, width: coverImageWidth, height });
  }

  // This adds the space between any items that we have. It's nice to do
  // this as a separate pass after everything else, because the math earlier
  // becomes easier and it's less brittle to change.
  if (gutter) {
    positions = paddingAll(gutter, positions);
  }

  return positions;
}

type Props = {|
  columns: Column,
  cover?: boolean,
  gutter?: number,
  height: number,
  layoutKey?: number,
  renderImage: ({|
    width: number,
    height: number,
    index: number,
  |}) => React.Node,
  width: number,
|};

export default function Collage(props: Props) {
  const {
    columns,
    cover,
    gutter,
    height,
    layoutKey,
    renderImage,
    width,
  } = props;
  const positions = getCollageLayout({
    columns,
    cover: !!cover,
    width,
    height,
    gutter: gutter || 0,
    layoutKey: layoutKey || 0,
  });
  return (
    <Collection
      Item={({ idx: index }) =>
        renderImage({
          index,
          width: positions[index].width,
          height: positions[index].height,
        })
      }
      layout={positions}
    />
  );
}

Collage.propTypes = {
  columns: PropTypes.oneOf([2, 3, 4]).isRequired,
  cover: PropTypes.bool,
  gutter: PropTypes.number,
  height: PropTypes.number.isRequired,
  layoutKey: PropTypes.number,
  renderImage: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
};
