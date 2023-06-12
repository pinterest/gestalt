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
          src="https://v2.pinimg.com/videos/mc/expMp4/18/77/51/1877513c45ca255d52bc2e364e782536_t1.mp4"
        />
      </Box>
      <Text align="center" italic>
        More idea images shift when user hovers over the tile
      </Text>
    </Flex>
  );
}
