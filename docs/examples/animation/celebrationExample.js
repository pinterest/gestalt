// @flow strict
import { type Node, useState } from 'react';
import { Box, Flex, Text, Video } from 'gestalt';

export default function Example(): Node {
  const [playing, setPlaying] = useState(false);

  return (
    <Flex gap={4} direction="column">
      <Box width={380} height="100%" margin="auto" borderStyle="shadow">
        <Video
          aspectRatio={9 / 16}
          controls
          objectFit="scale-down"
          onPlayError={({ error }) => error && setPlaying(false)}
          onPlay={() => setPlaying(true)}
          onControlsPlay={() => setPlaying(true)}
          onControlsPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          playing={playing}
          loop
          src="https://v2.pinimg.com/videos/mc/720p/96/f7/bb/96f7bbe98180bec3cfc9d93eb13aa96a.mp4"
        />
      </Box>
      <Text align="center" italic>
        An animation celebrates a new user selecting ideas for their feed
      </Text>
    </Flex>
  );
}
