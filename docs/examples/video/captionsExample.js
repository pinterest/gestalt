// @flow strict
import { type Node, useState } from 'react';
import { Box, Video } from 'gestalt';

export default function Example(): Node {
  const [playing, setPlaying] = useState(false);

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Box width={1000}>
        <Video
          aspectRatio={1024 / 435}
          captions="https://iandevlin.github.io/mdn/video-player-with-captions/subtitles/vtt/sintel-en.vtt"
          controls
          onPlayError={({ error }) => error && setPlaying(false)}
          onPlay={() => setPlaying(true)}
          onControlsPlay={() => setPlaying(true)}
          onControlsPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          playing={playing}
          loop
          src="https://iandevlin.github.io/mdn/video-player-with-captions/video/sintel-short.mp4"
        />
      </Box>
    </Box>
  );
}
