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
