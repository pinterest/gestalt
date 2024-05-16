import {ReactNode, useState} from 'react';
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
          objectFit="contain"
          onControlsPause={() => setPlaying(false)}
          onControlsPlay={() => setPlaying(true)}
          onEnded={() => setPlaying(false)}
          onPlay={() => setPlaying(true)}
          onPlayError={({ error }) => error && setPlaying(false)}
          playing={playing}
          src="https://v2.pinimg.com/videos/mc/expMp4/18/77/51/1877513c45ca255d52bc2e364e782536_t1.mp4"
        />
      </Box>
      <Text align="center" italic>
        More idea images shift when user hovers over the tile
      </Text>
    </Flex>
  );
}
