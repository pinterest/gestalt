// @flow strict
import { type Node, useState } from 'react';
import { Box, Video } from 'gestalt';

export default function Example(): Node {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Box width={1000}>
        <Video
          aspectRatio={1024 / 435}
          captions="https://iandevlin.github.io/mdn/video-player-with-captions/subtitles/vtt/sintel-en.vtt"
          controls
          playing={playing}
          volume={volume}
          onPlay={() => setPlaying(true)}
          onPlayError={({ error }) => error && setPlaying(false)}
          onControlsPlay={() => setPlaying(true)}
          onControlsPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          onVolumeChange={(e) => setVolume(e.volume)}
          loop
          src="https://iandevlin.github.io/mdn/video-player-with-captions/video/sintel-short.mp4"
        />
      </Box>
    </Box>
  );
}
