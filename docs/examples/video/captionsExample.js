// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Box, Video } from 'gestalt';

export default function Example(): ReactNode {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Box width={1000}>
        <Video
          aspectRatio={1024 / 435}
          captions="https://iandevlin.github.io/mdn/video-player-with-captions/subtitles/vtt/sintel-en.vtt"
          controls
          loop
          onControlsPause={() => setPlaying(false)}
          onControlsPlay={() => setPlaying(true)}
          onEnded={() => setPlaying(false)}
          onPlay={() => setPlaying(true)}
          onPlayError={({ error }) => error && setPlaying(false)}
          onVolumeChange={(e) => setVolume(e.volume)}
          playing={playing}
          src="https://iandevlin.github.io/mdn/video-player-with-captions/video/sintel-short.mp4"
          volume={volume}
        />
      </Box>
    </Box>
  );
}
