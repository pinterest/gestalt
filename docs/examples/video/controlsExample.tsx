import { useState } from 'react';
import { Box, Flex, IconButton, Label, Switch, Text, Video } from 'gestalt';

export default function Example() {
  const [showControls, setShowControls] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex alignItems="center" direction="column" gap={{ column: 2, row: 0 }}>
        <Flex alignItems="center" gap={{ row: 2, column: 0 }}>
          <Box paddingX={2}>
            <Label htmlFor="video">
              <Text>Show built-in Video controls</Text>
            </Label>
          </Box>
          <Switch
            id="video"
            onChange={() => setShowControls((value) => !value)}
            switched={showControls}
          />
        </Flex>
        <Box width={300}>
          <Video
            aspectRatio={540 / 960}
            controls={showControls}
            onControlsPause={() => setPlaying(false)}
            onControlsPlay={() => setPlaying(true)}
            onEnded={() => setPlaying(false)}
            onPlay={() => setPlaying(true)}
            onPlayError={({ error }) => error && setPlaying(false)}
            onVolumeChange={(e) => setVolume(e.volume)}
            playing={playing}
            poster="https://i.pinimg.com/videos/thumbnails/originals/c8/37/71/c83771d856bc1ee12e2d2f81083df9d4.0000000.jpg"
            src="https://v1.pinimg.com/videos/mc/expMp4/c8/37/71/c83771d856bc1ee12e2d2f81083df9d4_t1.mp4"
            volume={volume}
          >
            {!showControls ? (
              <Box
                alignItems="center"
                dangerouslySetInlineStyle={{ __style: { backgroundColor: 'rgb(0 0 0 / 0.3)' } }}
                display="flex"
                height="100%"
                justifyContent="center"
                width="100%"
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
