import { ComponentProps, useState } from 'react';
import Box from '../Box';
import ButtonToggle from '../ButtonToggle';
import Flex from '../Flex';
import TapArea from '../TapArea';

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

function getBorderColor(isHovered: boolean, isSelected: boolean) {
  // Selection state takes precedence
  if (isSelected) {
    return 'selected';
  }
  if (isHovered) {
    return 'tertiary';
  }
  return undefined;
}

export type Props = {
  colors: ReadonlyArray<string>;
  isSelected: boolean;
  onClick?: ComponentProps<typeof ButtonToggle>['onClick'];
  size: 'sm' | 'md' | 'lg';
};

export default function ColorPickerButton({ colors, isSelected, onClick, size }: Props) {
  const filtersContainerHeightPx = heights[size] + BORDER_OFFSET_PX * 2;
  const filtersContainerWidthPx = widths[size] + BORDER_OFFSET_PX * 2;

  const [hovered, setHovered] = useState(false);

  return (
    <Flex alignItems="center" height={filtersContainerHeightPx} justifyContent="start">
      <TapArea
        mouseCursor="pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        // @ts-expect-error - TS2322 - Type '(arg1: TouchEvent<HTMLDivElement>) => void' is not assignable to type 'TouchEventHandler<HTMLButtonElement>'.
        onTap={onClick}
        rounding="pill"
      >
        <Box
          alignItems="center"
          color={getBorderColor(hovered, isSelected)}
          display="flex"
          height={filtersContainerHeightPx}
          justifyContent="center"
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
      </TapArea>
    </Flex>
  );
}
