// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Box, DefaultLabelProvider, Video } from 'gestalt';

export default function Example(): ReactNode {
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
      <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
        <Box width={300}>
          <Video
            aspectRatio={540 / 960}
            controls
            onControlsPause={() => setPlaying(false)}
            onControlsPlay={() => setPlaying(true)}
            onEnded={() => setPlaying(false)}
            onPlay={() => setPlaying(true)}
            onPlayError={({ error }) => error && setPlaying(false)}
            onVolumeChange={(e) => setVolume(e.volume)}
            playing={playing}
            src="https://v.pinimg.com/videos/mc/expMp4/c8/37/71/c83771d856bc1ee12e2d2f81083df9d4_t1.mp4"
            volume={volume}
          />
        </Box>
      </Box>
    </DefaultLabelProvider>
  );
}
