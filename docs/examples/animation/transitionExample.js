// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Box, Flex, Text, Video } from 'gestalt';

export default function Example(): ReactNode {
  const [playing, setPlaying] = useState(false);

  return (
    <Flex direction="column" gap={4}>
      <Box borderStyle="shadow" height="100%" margin="auto">
        <Video
          aspectRatio={1920 / 1016}
          controls
          loop
          onControlsPause={() => setPlaying(false)}
          onControlsPlay={() => setPlaying(true)}
          onEnded={() => setPlaying(false)}
          onPlay={() => setPlaying(true)}
          onPlayError={({ error }) => error && setPlaying(false)}
          playing={playing}
          src="https://user-images.githubusercontent.com/5125094/198142847-0df04da0-bad4-4da4-afe8-8c06d8aecc5b.mov"
        />
      </Box>
      <Text align="center" italic>
        An OverlayPanel transitions in and out from the side of the screen using animation
      </Text>
    </Flex>
  );
}
