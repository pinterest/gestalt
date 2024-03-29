// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Flex, Text } from 'gestalt';

export default function Example(): ReactNode {
  const text =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nisl nec turpis vehicula ultrices. Duis pretium ut ipsum nec interdum. Vestibulum arcu dolor, consectetur ac eros a, varius commodo justo. Maecenas tincidunt neque elit, eu pretium arcu dictum ac. Donec vehicula mauris ut erat dictum, eget tempus elit luctus. In volutpat felis justo, et venenatis arcu viverra in. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin enim lorem, vulputate eget imperdiet nec, dapibus sed diam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse rhoncus ut leo non gravida. Nulla tincidunt tellus sit amet ornare venenatis. Sed quis lorem cursus, porttitor tellus sed, commodo ex. Praesent blandit pretium faucibus. Aenean orci tellus, vulputate id sapien sit amet, porta fermentum quam. Praesent sem risus, tristique sit amet pulvinar in, scelerisque sit amet massa.';

  return (
    <Flex alignItems="center" gap={4} height="100%" justifyContent="center" width="100%" wrap>
      <Flex direction="column" gap={{ column: 8, row: 0 }} wrap>
        <Box>
          <Text>Overflow Hidden</Text>
          <Box borderStyle="lg" maxHeight={100} overflow="hidden" padding={2} width={300}>
            <Text>{text}</Text>
          </Box>
        </Box>
        <Box>
          <Text>Overflow Scroll</Text>
          <Box
            borderStyle="lg"
            maxHeight={100}
            overflow="scroll"
            padding={2}
            tabIndex={0}
            width={300}
          >
            <Text>{text}</Text>
          </Box>
        </Box>
        <Box marginBottom={4}>
          <Text>Overflow Visible</Text>
          <Box borderStyle="lg" maxHeight={100} overflow="visible" padding={2} width={300}>
            <Text>{text.substring(0, 180)}</Text>
          </Box>
        </Box>
        <Box>
          <Text>Overflow Auto</Text>
          <Box color="selected" maxHeight={100} overflow="auto" padding={2} width={300}>
            <Box color="default" padding={2} tabIndex={0} width={350}>
              <Text>{text}</Text>
            </Box>
          </Box>
        </Box>
        <Box>
          <Text>Overflow scrollX</Text>
          <Box color="selected" maxHeight={100} overflow="scrollX" padding={2} width={300}>
            <Box color="default" padding={2} tabIndex={0} width={350}>
              <Text>{text}</Text>
            </Box>
          </Box>
        </Box>
        <Box>
          <Text>Overflow scrollY</Text>
          <Box color="selected" maxHeight={100} overflow="scrollY" padding={2} width={300}>
            <Box color="default" padding={2} tabIndex={0} width={350}>
              <Text>{text}</Text>
            </Box>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}
