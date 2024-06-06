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
};

export default function ColorPickerButton({ colors, selected, size }: Props) {
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
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
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
          {colors.map((colorHex, index) => (
            <Box
              // eslint-disable-next-line react/no-array-index-key
              key={`${colorHex}-${index}`}
              dangerouslySetInlineStyle={{
                __style: { backgroundColor: colorHex },
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
