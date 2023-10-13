// @flow strict
import { type Node, useState } from 'react';
import { Box, DefaultLabelProvider, Video } from 'gestalt';

export default function Example(): Node {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

  return (
    <DefaultLabelProvider
      // $FlowExpectedError[incompatible-type] For demostration purposes
      labels={{
        Video: {
          accessibilityMaximizeLabel: 'Maximieren',
          accessibilityMinimizeLabel: 'Minimieren',
          accessibilityMuteLabel: 'Stummschalten',
          accessibilityPauseLabel: 'Pause',
          accessibilityPlayLabel: 'Spielen',
          accessibilityProgressLabel: 'Video Fortschritt',
          accessibilityUnmuteLabel: 'Stummschaltung aufheben',
          accessibilityHideCaptionsLabel: 'Bildunterschriften ausblenden',
          accessibilityShowCaptionsLabel: 'Bildunterschriften anzeigen',
        },
      }}
    >
      <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
        <Box width={300}>
          <Video
            aspectRatio={540 / 960}
            controls
            playing={playing}
            volume={volume}
            onPlay={() => setPlaying(true)}
            onPlayError={({ error }) => error && setPlaying(false)}
            onControlsPlay={() => setPlaying(true)}
            onControlsPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
            onVolumeChange={(e) => setVolume(e.volume)}
            src="https://v.pinimg.com/videos/mc/expMp4/c8/37/71/c83771d856bc1ee12e2d2f81083df9d4_t1.mp4"
          />
        </Box>
      </Box>
    </DefaultLabelProvider>
  );
}
