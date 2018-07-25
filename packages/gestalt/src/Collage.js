// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from './Box.js';
import Collection from './Collection.js';
import Mask from './Mask.js';
import Image from './Image.js';

// This function was inspired by the answer given here:
//
//     https://stackoverflow.com/a/8831937
//
// It's just meant to produce a stable number for a given string.
const fasthash = (str: string) => {
  let hash = 0;
  if (str.length === 0) {
    return hash;
  }
  for (let i = 0; i < str.length; i += 1) {
    // eslint-disable-next-line no-bitwise
    hash = (hash << 5) - hash + str.charCodeAt(i);
    // eslint-disable-next-line no-bitwise
    hash &= hash;
  }
  return Math.abs(hash);
};

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
const columnLayout = (numOfColumns: number) => {
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

const paddingAll = ({ value: padding, type }, positions) => {
  const originOffset = type === 'around' ? padding : 0;
  const sizeOffset = -2 * padding;
  return positions.map(({ top, left, width, height }) => ({
    top: top + originOffset,
    left: left + originOffset,
    width: width + sizeOffset,
    height: height + sizeOffset,
  }));
};

const mindex = arr =>
  arr.reduce((minIndex, item, i) => (item < arr[minIndex] ? i : minIndex), 0);

type CollageSpace = {|
  type: 'around' | 'between',
  value: number,
|};

type ImageType = {
  color?: string,
  naturalWidth: number,
  naturalHeight: number,
  src: string,
};

const ImagePropType = PropTypes.exact({
  color: PropTypes.string,
  naturalWidth: PropTypes.number.isRequired,
  naturalHeight: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
});

function getCollageLayout({
  hasCoverImage,
  height,
  images,
  numCols,
  space,
  width,
}: {
  hasCoverImage: boolean,
  height: number,
  images: Array<ImageType>,
  numCols: number,
  space?: CollageSpace,
  width: number,
}) {
  let positions = [];

  // If there's a cover image, we'll add that later. It should be a little
  // less than half the width of the collage. We do this now (and not later
  // when we add the cover image) because of `columnLayout`'s constraints
  // needing the exact number of columns that are displayed.
  const gridCols = hasCoverImage ? Math.floor(numCols / 2) : numCols;
  const items = images
    .slice(0, 2 * gridCols)
    .map(thumb => ({ ...thumb, isCover: false }));

  // Selects the layout that we're going to use for the grid
  const columns = columnLayout(gridCols);
  const key = items
    .map(item => item.src || '')
    .sort()
    .join('');
  const layoutIdx = fasthash(key) % columns.length;
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
  if (hasCoverImage) {
    const coverImageWidth = Math.ceil(numCols / 2) * (width / numCols);
    items.unshift({ isCover: true });
    positions = positions.map(position => ({
      ...position,
      left: coverImageWidth + position.left,
    }));
    positions.unshift({ top: 0, left: 0, width: coverImageWidth, height });
  }

  // This adds the space between any items that we have. It's nice to do
  // this as a separate pass after everything else, because the math earlier
  // becomes easier and it's less brittle to change.
  if (space) {
    positions = paddingAll(space, positions);
  }

  return { items, positions };
}

type Props = {|
  height: number,
  imageAlt?: string,
  images: Array<ImageType>,
  imagesAreRounded?: boolean,
  numCols: number,
  renderCoverImage?: ({| width: number, height: number |}) => React.Node,
  space?: CollageSpace,
  width: number,
|};

export default function Collage(props: Props) {
  const {
    height,
    imageAlt,
    images,
    imagesAreRounded,
    numCols,
    renderCoverImage,
    space,
    width,
  } = props;
  const sizeOffset = space && space.type === 'between' ? space.value * 2 : 0;
  const { items, positions } = getCollageLayout({
    width: width + sizeOffset,
    height: height + sizeOffset,
    numCols,
    space,
    images,
    hasCoverImage: !!renderCoverImage,
  });
  const imageShape = imagesAreRounded ? 'rounded' : 'square';
  return (
    <Collection
      Item={({ idx }) => {
        const item = items[idx];
        const position = positions[idx];
        const { width: itemWidth, height: itemHeight } = position;
        if (!item) {
          return (
            <Box
              color="lightGray"
              height={itemHeight}
              shape={imageShape}
              width={itemWidth}
            />
          );
        }
        if (item.isCover && renderCoverImage) {
          return (
            <Mask height={itemHeight} shape={imageShape}>
              {renderCoverImage({ width: itemWidth, height: itemHeight })}
            </Mask>
          );
        }
        return (
          <Mask wash height={itemHeight} shape={imageShape}>
            <Image
              alt={imageAlt || ''}
              color={item.color || '#EFEFEF'}
              fit="cover"
              naturalHeight={item.naturalHeight || 1}
              naturalWidth={item.naturalWidth || 1}
              src={item.src || ''}
            />
          </Mask>
        );
      }}
      itemPadding={(space && space.value) || 0}
      layout={positions}
    />
  );
}

Collage.propTypes = {
  height: PropTypes.number.isRequired,
  imageAlt: PropTypes.string,
  images: PropTypes.arrayOf(ImagePropType),
  imagesAreRounded: PropTypes.bool,
  numCols: PropTypes.number.isRequired,
  renderCoverImage: PropTypes.func,
  space: PropTypes.exact({
    type: PropTypes.oneOf(['around', 'between']).isRequired,
    value: PropTypes.number.isRequired,
  }),
  width: PropTypes.number.isRequired,
};
