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
          src="https://v.pinimg.com/videos/mc/720p/f4/5c/51/f45c5182f7721c660309948a973c6408.mp4"
        />
      </Box>
      <Text align="center" italic>
        Hand and arrow illustration are animated to help teach users how to navigate the
        application.
      </Text>
    </Flex>
  );
}
