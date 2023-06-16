// @flow strict
import { type Node, useState } from 'react';
import { Box, Flex, Text, Video } from 'gestalt';

export default function Example(): Node {
  const [playing, setPlaying] = useState(false);

  return (
    <Flex gap={4} direction="column">
      <Box height="100%" margin="auto">
        <Video
          aspectRatio={1920 / 1080}
          controls
          onPlayError={({ error }) => error && setPlaying(false)}
          onPlay={() => setPlaying(true)}
          onControlsPlay={() => setPlaying(true)}
          onControlsPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          playing={playing}
          loop
          src="https://github.com/pinterest/gestalt/assets/96082362/000de356-e9d2-483e-9991-025f509f0f65"
        />
      </Box>
      <Box smPadding={2} marginTop={-2}>
        <Text align="center" italic size="100">
          A cursor pointer hovers over a single line graph area, as a tooltip and dot on the graph
          follow the cursor&apos;s movement. The tooltip moves so it doesn&apos;t obstruct the graph
          line. The pointer them moves up to select a second metric. Two lines are shown, and
          tooltips only show when hovering explicitly over each line.
        </Text>
      </Box>
    </Flex>
  );
}
