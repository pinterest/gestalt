// @flow strict
import { type Node } from 'react';
import Box from './Box.js';
import typography from './Typography.css';
import { useColorScheme } from './contexts/ColorScheme.js';

type ResponsiveFitSizeBoxProps = {| children: Node |};

type Props = {|
  accessibilityLabel?: string,
  name: string,
|};

function ResponsiveFitSizeBox({ children }: ResponsiveFitSizeBoxProps): Node {
  return (
    <Box
      color="lightGray"
      dangerouslySetInlineStyle={{ __style: { paddingBottom: '100%' } }} // When specifying a padding by percentage, it's always based on the width. In this way we get a property that's equal to the width.
      position="relative"
      rounding="circle"
    >
      <Box
        position="absolute"
        // top left bottom right constrains the circle to the exact dimensions of the responsive parent square
        top
        left
        bottom
        right
      >
        {children}
      </Box>
    </Box>
  );
}

export default function DefaultAvatar({ accessibilityLabel, name }: Props): Node {
  const { colorGray300 } = useColorScheme();
  const firstInitial = name ? [...name][0].toUpperCase() : '';
  const title = accessibilityLabel ?? name;

  return (
    <ResponsiveFitSizeBox>
      <svg
        width="100%"
        viewBox="-50 -50 100 100"
        version="1.1"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>{title}</title>
        <text
          fontSize="40px"
          fill={colorGray300}
          dy="0.35em"
          textAnchor="middle"
          className={[typography.antialiased, typography.sansSerif, typography.fontWeightBold].join(
            ' ',
          )}
        >
          {firstInitial}
        </text>
      </svg>
    </ResponsiveFitSizeBox>
  );
}
