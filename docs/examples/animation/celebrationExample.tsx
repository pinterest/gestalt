import { useState } from 'react';
import { Box, Flex, Text, Video } from 'gestalt';

export default function Example() {
  const [playing, setPlaying] = useState(false);

  return (
    <Flex direction="column" gap={4}>
      <Box borderStyle="shadow" height="100%" margin="auto" width={380}>
        <Video
          aspectRatio={9 / 16}
          controls
          loop
          objectFit="scale-down"
          onControlsPause={() => setPlaying(false)}
          onControlsPlay={() => setPlaying(true)}
          onEnded={() => setPlaying(false)}
          onPlay={() => setPlaying(true)}
          onPlayError={({ error }) => error && setPlaying(false)}
          playing={playing}
          src="https://v2.pinimg.com/videos/mc/720p/96/f7/bb/96f7bbe98180bec3cfc9d93eb13aa96a.mp4"
        />
      </Box>
      <Text align="center" italic>
        An animation celebrates a new user selecting ideas for their feed
      </Text>
    </Flex>
  );
}
