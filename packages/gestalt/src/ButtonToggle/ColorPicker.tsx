import { useState } from 'react';
import Box from '../Box';

const BORDER_OFFSET_PX = 4;

const heights = {
  sm: 32,
  md: 40,
  lg: 48,
};

const widths = {
  sm: 60,
  md: 72,
  lg: 88,
};

const skinColor = {
  skinTone1: '#F0E3DC',
  skinTone2: '#F8D7D8',
  skinTone3: '#F2D7BE',
  skinTone4: '#F7C3AF',
  skinTone5: '#DEBAB0',
  skinTone6: '#E0999A',
  skinTone7: '#DDA67C',
  skinTone8: '#D98A64',
  skinTone9: '#9A6B52',
  skinTone10: '#A25847',
  skinTone11: '#B37143',
  skinTone12: '#BF6951',
  skinTone13: '#683929',
  skinTone14: '#34261F',
  skinTone15: '#64281B',
  skinTone16: '#4F2221',
};

export type SkinColor = keyof typeof skinColor;

function getBorderColor(hovered: boolean, selected: boolean) {
  // Selection state takes precedence
  if (selected) {
    return 'selected';
  }
  if (hovered) {
    return 'tertiary';
  }
  return undefined;
}

export type Props = {
  colors: ReadonlyArray<string>;
  selected: boolean;
  size: 'sm' | 'md' | 'lg';
  disabled: boolean;
};

export default function ColorPicker({ colors, disabled, selected, size }: Props) {
  const filtersContainerHeightPx = heights[size] + BORDER_OFFSET_PX * 2;
  const filtersContainerWidthPx = widths[size] + BORDER_OFFSET_PX * 2;
  const [hovered, setHovered] = useState(false);

  return (
    <Box
      alignItems="center"
      color={getBorderColor(hovered, selected)}
      display="flex"
      height={filtersContainerHeightPx}
      justifyContent="center"
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => !disabled && setHovered(false)}
      rounding="pill"
      width={filtersContainerWidthPx}
    >
      <Box
        alignItems="center"
        color="default"
        display="flex"
        height={filtersContainerHeightPx - BORDER_OFFSET_PX}
        justifyContent="center"
        rounding="pill"
        width={filtersContainerWidthPx - BORDER_OFFSET_PX}
      >
        <Box
          display="flex"
          height={heights[size]}
          overflow="hidden"
          rounding="pill"
          width={widths[size]}
          wrap
        >
          {colors.map((color, index) => (
            <Box
              // eslint-disable-next-line react/no-array-index-key
              key={`${color}-${index}`}
              dangerouslySetInlineStyle={{
                __style: { backgroundColor: skinColor[color as SkinColor] },
              }}
              height={heights[size] / 2}
              width={widths[size] / 2}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
