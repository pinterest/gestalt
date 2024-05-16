import { ReactNode, useState } from 'react';
import { Box, Video } from 'gestalt';

export default function Example() {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Box width={500}>
        <Video
          aspectRatio={426 / 240}
          controls
          onControlsPause={() => setPlaying(false)}
          onControlsPlay={() => setPlaying(true)}
          onEnded={() => setPlaying(false)}
          onPlay={() => setPlaying(true)}
          onPlayError={({ error }) => error && setPlaying(false)}
          onVolumeChange={(e) => setVolume(e.volume)}
          playing={playing}
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
          volume={volume}
        />
      </Box>
    </Box>
  );
}
