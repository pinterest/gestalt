// @flow strict
import { type Node } from 'react';
import { Box, Flex, Text } from 'gestalt';

export default function Example(): Node {
  const text =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nisl nec turpis vehicula ultrices. Duis pretium ut ipsum nec interdum. Vestibulum arcu dolor, consectetur ac eros a, varius commodo justo. Maecenas tincidunt neque elit, eu pretium arcu dictum ac. Donec vehicula mauris ut erat dictum, eget tempus elit luctus. In volutpat felis justo, et venenatis arcu viverra in. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin enim lorem, vulputate eget imperdiet nec, dapibus sed diam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse rhoncus ut leo non gravida. Nulla tincidunt tellus sit amet ornare venenatis. Sed quis lorem cursus, porttitor tellus sed, commodo ex. Praesent blandit pretium faucibus. Aenean orci tellus, vulputate id sapien sit amet, porta fermentum quam. Praesent sem risus, tristique sit amet pulvinar in, scelerisque sit amet massa.';

  return (
    <Flex gap={4} wrap width="100%" height="100%" justifyContent="center" alignItems="center">
      <Flex gap={{ column: 8, row: 0 }} direction="column" wrap>
        <Box>
          <Text>Overflow Hidden</Text>
          <Box overflow="hidden" width={300} maxHeight={100} padding={2} borderStyle="lg">
            <Text>{text}</Text>
          </Box>
        </Box>
        <Box>
          <Text>Overflow Scroll</Text>
          <Box
            overflow="scroll"
            width={300}
            maxHeight={100}
            padding={2}
            borderStyle="lg"
            tabIndex={0}
          >
            <Text>{text}</Text>
          </Box>
        </Box>
        <Box marginBottom={4}>
          <Text>Overflow Visible</Text>
          <Box overflow="visible" width={300} maxHeight={100} padding={2} borderStyle="lg">
            <Text>{text.substring(0, 180)}</Text>
          </Box>
        </Box>
        <Box>
          <Text>Overflow Auto</Text>
          <Box overflow="auto" width={300} maxHeight={100} padding={2} color="selected">
            <Box width={350} padding={2} color="default" tabIndex={0}>
              <Text>{text}</Text>
            </Box>
          </Box>
        </Box>
        <Box>
          <Text>Overflow scrollX</Text>
          <Box overflow="scrollX" width={300} maxHeight={100} padding={2} color="selected">
            <Box width={350} padding={2} color="default" tabIndex={0}>
              <Text>{text}</Text>
            </Box>
          </Box>
        </Box>
        <Box>
          <Text>Overflow scrollY</Text>
          <Box overflow="scrollY" width={300} maxHeight={100} padding={2} color="selected">
            <Box width={350} padding={2} color="default" tabIndex={0}>
              <Text>{text}</Text>
            </Box>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}
