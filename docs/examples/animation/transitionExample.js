// @flow strict
import { type Node, useState } from 'react';
import { Box, Flex, Text, Video } from 'gestalt';

export default function Example(): Node {
  const [playing, setPlaying] = useState(false);

  return (
    <Flex gap={4} direction="column">
      <Box height="100%" margin="auto" borderStyle="shadow">
        <Video
          aspectRatio={1920 / 1016}
          controls
          onPlayError={({ error }) => error && setPlaying(false)}
          onPlay={() => setPlaying(true)}
          onControlsPlay={() => setPlaying(true)}
          onControlsPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          playing={playing}
          loop
          src="https://user-images.githubusercontent.com/5125094/198142847-0df04da0-bad4-4da4-afe8-8c06d8aecc5b.mov"
        />
      </Box>
      <Text align="center" italic>
        An OverlayPanel transitions in and out from the side of the screen using animation
      </Text>
    </Flex>
  );
}
