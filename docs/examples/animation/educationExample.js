// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Box, Flex, Text, Video } from 'gestalt';

export default function Example(): ReactNode {
  const [playing, setPlaying] = useState(false);

  return (
    <Flex direction="column" gap={4}>
      <Box borderStyle="shadow" height="100%" margin="auto" width={380}>
        <Video
          aspectRatio={9 / 16}
          controls
          loop
          objectFit="contain"
          onControlsPause={() => setPlaying(false)}
          onControlsPlay={() => setPlaying(true)}
          onEnded={() => setPlaying(false)}
          onPlay={() => setPlaying(true)}
          onPlayError={({ error }) => error && setPlaying(false)}
          playing={playing}
          src="https://v2.pinimg.com/videos/mc/expMp4/d4/9e/9b/d49e9bd60454bd07da10f8e01017265c_t1.mp4"
        />
      </Box>
      <Text align="center" italic>
        Additional Creator options animate in to draw user&apos;s attention to new content to follow
      </Text>
    </Flex>
  );
}
