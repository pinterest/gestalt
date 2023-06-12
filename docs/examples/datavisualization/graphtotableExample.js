// @flow strict
import { type Node, useState } from 'react';
import { Box, Flex, Text, Video } from 'gestalt';

export default function Example(): Node {
  const [playing, setPlaying] = useState(false);

  return (
    <Flex gap={4} direction="column">
      <Box height="100%" margin="auto">
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
          src="https://github.com/pinterest/gestalt/assets/96082362/8e595e5f-9e7f-4b44-9b9c-b011d805ad73"
        />
      </Box>
      <Box smPadding={2} marginTop={-2}>
        <Text align="center" italic size="100">
          A button on a line graph is pressed to open a modal dialog with a tabular version of the
          graph data.
        </Text>
      </Box>
    </Flex>
  );
}
