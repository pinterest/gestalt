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
          aspectRatio={1920 / 1080}
          controls
          onPlayError={({ error }) => error && setPlaying(false)}
          onPlay={() => setPlaying(true)}
          onControlsPlay={() => setPlaying(true)}
          onControlsPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          playing={playing}
          loop
          src="https://github.com/pinterest/gestalt/assets/96082362/cb332732-0176-4f7e-ada9-2232d5732152"
        />
      </Box>
      <Box smPadding={2} marginTop={-2}>
        <Text align="center" italic size="100">
          A touch indicator moves along a graph on a mobile screen as the tooltip and dot on the
          line follow along. The tooltip stays in the same position above the graph.
        </Text>
      </Box>
    </Flex>
  );
}
