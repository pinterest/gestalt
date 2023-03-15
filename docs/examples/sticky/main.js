// @flow strict
import { type Node } from 'react';
import { Box, CompositeZIndex, FixedZIndex, Sticky, Text } from 'gestalt';

const BOX_ZINDEX = new FixedZIndex(1);
const STICKY_ZINDEX = new CompositeZIndex([BOX_ZINDEX]);

export default function Example(): Node {
  return (
    <Box color="default" height={200} overflow="scroll" tabIndex={0}>
      <Box height={500} marginTop={10}>
        <Sticky top={0}>
          <Box alignItems="center" color="infoWeak" display="flex" height={40}>
            <Text>This should stick</Text>
          </Box>
        </Sticky>

        <Box marginTop={10} marginBottom={10} position="relative">
          <Text>Scroll</Text>
          <Text>Keep scrolling</Text>
          <Text>Scroll more</Text>
        </Box>

        <Sticky top={0} zIndex={STICKY_ZINDEX}>
          <Box
            alignItems="center"
            color="successWeak"
            display="flex"
            height={40}
            position="relative"
            zIndex={BOX_ZINDEX}
          >
            <Text>This should also stick</Text>
          </Box>
        </Sticky>

        <Box marginTop={10}>
          <Text>Still scrolling</Text>
          <Text> 🎉 Tadaaaaa 🎉 </Text>
        </Box>
      </Box>
    </Box>
  );
}
