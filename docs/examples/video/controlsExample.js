// @flow strict
import { type Node, useState } from 'react';
import { Box, Flex, IconButton, Label, Switch, Text, Video } from 'gestalt';

export default function Example(): Node {
  const [showControls, setShowControls] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex alignItems="center" gap={{ column: 2, row: 0 }} direction="column">
        <Flex alignItems="center" gap={{ row: 2, column: 0 }}>
          <Box paddingX={2}>
            <Label htmlFor="video">
              <Text>Show built-in Video controls</Text>
            </Label>
          </Box>
          <Switch
            onChange={() => setShowControls((value) => !value)}
            id="video"
            switched={showControls}
          />
        </Flex>
        <Box width={300}>
          <Video
            aspectRatio={540 / 960}
            controls={showControls}
            playing={playing}
            volume={volume}
            onPlay={() => setPlaying(true)}
            onPlayError={({ error }) => error && setPlaying(false)}
            onControlsPlay={() => setPlaying(true)}
            onControlsPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
            onVolumeChange={(e) => setVolume(e.volume)}
            poster="https://i.pinimg.com/videos/thumbnails/originals/c8/37/71/c83771d856bc1ee12e2d2f81083df9d4.0000000.jpg"
            src="https://v.pinimg.com/videos/mc/expMp4/c8/37/71/c83771d856bc1ee12e2d2f81083df9d4_t1.mp4"
          >
            {!showControls ? (
              <Box
                width="100%"
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                dangerouslySetInlineStyle={{ __style: { backgroundColor: 'rgba(0, 0, 0, 0.3)' } }}
              >
                <IconButton accessibilityLabel="Play video" bgColor="white" icon="play" size="lg" />
              </Box>
            ) : null}
          </Video>
        </Box>
      </Flex>
    </Box>
  );
}
