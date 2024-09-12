import { ReactNode } from 'react';
import { Size, SIZE_MAP } from './constants';
import Box from '../Box';

type Props = {
  children: ReactNode;
  pileCount: number;
  index: number;
  size: Size;
};

// PositioningWrapper provides a width and height for each avatar and positions them correctly in the superposed stack.
export default function PositioningWrapper({ size, pileCount, index, children }: Props) {
  const FIT_SIZING_DENOMINATOR = 2 * pileCount + 1;

  const isFitSize = size === 'fit';

  let marginStart: string;

  if (isFitSize) {
    // Each avatar superposes a third of the previous one. Each avatar equals 3/3 parts. Two avatars are 5/5, each of them being 3/5 parts of the whole sharing a 1/5 overlapping part, and so forth. To provide a perfect-pixel positioning on any responsive size, we use the 2/3 part on each index position to place the next superposed avatar.
    marginStart = `${((2 * index) / FIT_SIZING_DENOMINATOR) * 100}%`;
  } else {
    marginStart = index === 0 ? '0px' : `${(-1 * SIZE_MAP[size]) / 3}px`;
  }

  // To provide a perfect-pixel width for each responsive avatar, we use the ratio of 3 parts of the total parts of the whole AvatarGroup. A 4-avatar component has 9 total parts, and each avatar's witdh is 3/9 of the total width.
  const width = isFitSize ? `${(3 / FIT_SIZING_DENOMINATOR) * 100}%` : undefined;

  return (
    <Box
      aria-hidden="true"
      dangerouslySetInlineStyle={{
        __style: {
          marginInlineStart: marginStart,
          top: isFitSize ? 0 : undefined,
        },
      }}
      position={isFitSize ? 'absolute' : 'static'}
      width={width}
    >
      {children}
    </Box>
  );
}
