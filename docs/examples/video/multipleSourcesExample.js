// @flow strict
import { type Node, useState } from 'react';
import { Box, Video } from 'gestalt';

export default function Example(): Node {
  const [playing, setPlaying] = useState(false);

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Box width={500}>
        <Video
          aspectRatio={426 / 240}
          controls
          playing={playing}
          onPlay={() => {}}
          onPlayError={() => {}}
          onControlsPlay={() => setPlaying(true)}
          src={[
            {
              type: 'video/mp4',
              src: 'https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4',
            },
            {
              type: 'video/ogg',
              src: 'https://archive.org/download/ElephantsDream/ed_hd.ogv',
            },
          ]}
        />
      </Box>
    </Box>
  );
}
