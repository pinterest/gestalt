// @flow strict
import { type Node, useState } from 'react';
import { Box, Flex, Text, Video } from 'gestalt';

export default function Example(): Node {
  const [playing, setPlaying] = useState(false);

  return (
    <Flex gap={4} direction="column">
      <Box width={380} height="100%" margin="auto" borderStyle="shadow">
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
          aspectRatio={9 / 16}
          controls
          objectFit="contain"
          onPlayError={({ error }) => error && setPlaying(false)}
          onPlay={() => setPlaying(true)}
          onControlsPlay={() => setPlaying(true)}
          onControlsPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          playing={playing}
          loop
          src="https://v2.pinimg.com/videos/mc/720p/b5/b5/a0/b5b5a0b7388da733cf7727efead7ae2e.mp4"
        />
      </Box>
      <Text align="center" italic>
        An illustration animation is used to educate users about the flow of content
      </Text>
    </Flex>
  );
}
