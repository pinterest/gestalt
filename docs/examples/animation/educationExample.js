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
          objectFit="contain"
          onPlayError={({ error }) => error && setPlaying(false)}
          onPlay={() => setPlaying(true)}
          onControlsPlay={() => setPlaying(true)}
          onControlsPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          playing={playing}
          loop
          src="https://v2.pinimg.com/videos/mc/expMp4/d4/9e/9b/d49e9bd60454bd07da10f8e01017265c_t1.mp4"
        />
      </Box>
      <Text align="center" italic>
        Additional Creator options animate in to draw user&apos;s attention to new content to follow
      </Text>
    </Flex>
  );
}
