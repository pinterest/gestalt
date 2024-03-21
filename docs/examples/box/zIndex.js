// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, CompositeZIndex, FixedZIndex, Sticky, Text } from 'gestalt';

export default function Example(): ReactNode {
  const HEADER_ZINDEX = new FixedZIndex(100);
  const zIndex = new CompositeZIndex([HEADER_ZINDEX]);
  return (
    <Box
      column={12}
      dangerouslySetInlineStyle={{ __style: { isolation: 'isolate' } }}
      height={150}
      overflow="scroll"
      tabIndex={0}
    >
      <Sticky top={0} zIndex={HEADER_ZINDEX}>
        <Box color="errorBase" height={60} padding={2} width="80%">
          <Text color="light">This is sticky and won&apos;t move when scrolling</Text>
        </Box>
      </Sticky>
      <Box
        color="infoBase"
        height={100}
        padding={2}
        position="relative"
        width="50%"
        zIndex={zIndex}
      >
        <Text color="light">This will float above the sticky Box when scrolling</Text>
      </Box>
      <Box color="successBase" height={120} padding={2} width="30%">
        <Text color="light">This will go behind the sticky Box when scrolling</Text>
      </Box>
    </Box>
  );
}
