import React, { ComponentProps } from 'react';
import Box from '../Box';
import ButtonToggle from '../ButtonToggle';
import Flex from '../Flex';
import TapArea from '../TapArea';

const BORDER_OFFSET_PX = 4;

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
};

export default function SkinToneFilterSwatches({ colors, isSelected, onClick }: Props) {
  const skinToneCircleHeightPx = 56;
  const skinToneCircleWidthPx = 84;
  const filtersContainerHeightPx = skinToneCircleHeightPx + BORDER_OFFSET_PX * 2;
  const filtersContainerWidthPx = skinToneCircleWidthPx + BORDER_OFFSET_PX * 2;

  const [hovered, setHovered] = React.useState(false);

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
              height={skinToneCircleHeightPx}
              overflow="hidden"
              rounding="pill"
              width={skinToneCircleWidthPx}
              wrap
            >
              {colors.map((colorHex, index) => (
                <Box
                  // eslint-disable-next-line react/no-array-index-key
                  key={`${colorHex}-${index}`}
                  dangerouslySetInlineStyle={{
                    __style: { backgroundColor: colorHex },
                  }}
                  height={skinToneCircleHeightPx / 2}
                  width={skinToneCircleWidthPx / 2}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </TapArea>
    </Flex>
  );
}
