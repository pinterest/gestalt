// @flow strict
import { type Node, useState } from 'react';
import { Box, Flex, Text, Video } from 'gestalt';

export default function Example(): Node {
  const [playing, setPlaying] = useState(false);

  return (
    <Flex gap={4} direction="column">
      <Box height="100%" margin="auto">
        <Video
          accessibilityMaximizeLabel="Maximize"
          accessibilityMinimizeLabel="Minimize"
          accessibilityMuteLabel="Mute"
          accessibilityPauseLabel="Pause"
          accessibilityPlayLabel="Play"
          accessibilityProgressBarLabel="Progress bar"
          accessibilityUnmuteLabel="Unmute"
          accessibilityHideCaptionsLabel="Hide captions"
          accessibilityShowCaptionsLabel="Show captions"
          aspectRatio={1920 / 1016}
          controls
          onPlayError={({ error }) => error && setPlaying(false)}
          onPlay={() => setPlaying(true)}
          onControlsPlay={() => setPlaying(true)}
          onControlsPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          playing={playing}
          loop
          src="https://github.com/pinterest/gestalt/assets/96082362/6378b31d-9f2f-45d0-816b-c107b5a179dc"
        />
      </Box>
      <Box smPadding={2} marginTop={-2}>
        <Text align="center" italic size="100">
          A cursor pointer hovers over a single line graph area, as a tooltip and dot on the graph
          follow the cursor&apos;s movement. The tooltip moves so it doesn&apos;t obstruct the graph
          line. The pointer them moves up to select a second metric. Two lines are shown, and
          tooltips only show when hovering explicitly over each line.
        </Text>
      </Box>
    </Flex>
  );
}
