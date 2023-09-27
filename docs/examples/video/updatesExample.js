// @flow strict
import { type Node, useState } from 'react';
import { Box, Button, Flex, Label, Text, TextField, Video } from 'gestalt';

export default function Example(): Node {
  const [input, setInput] = useState(
    'https://v.pinimg.com/videos/mc/expMp4/ce/b4/cc/ceb4cc8c4889a86432a65884c147021f_t1.mp4',
  );
  const [playbackRate, setPlaybackRate] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [src, setSrc] = useState(
    'https://v.pinimg.com/videos/mc/expMp4/c8/37/71/c83771d856bc1ee12e2d2f81083df9d4_t1.mp4',
  );
  const [volume, setVolume] = useState(1);

  return (
    <Box padding={8} height="100%" display="flex" justifyContent="center">
      <Flex width="100%" gap={{ column: 2, row: 0 }} direction="column">
        <Label htmlFor="video-source">
          <Text>Video source URL</Text>
        </Label>
        <Flex width="100%" gap={{ row: 2, column: 0 }} alignItems="center">
          <Flex.Item flex="grow">
            <TextField id="video-source" onChange={({ value }) => setInput(value)} value={input} />
          </Flex.Item>
          <Button text="Submit" color="red" onClick={() => setSrc(input)} />
        </Flex>
        <Flex gap={{ column: 0, row: 2 }}>
          <Button
            text={volume === 0 ? 'Unmute' : 'Mute'}
            onClick={() => setVolume(volume === 0 ? 1 : 0)}
          />
          <Button
            text="Playback x0.5"
            onClick={() => setPlaybackRate((value) => (value >= 1 ? value / 2 : 0.5))}
          />
          <Button
            text="Playback x2"
            onClick={() => setPlaybackRate((value) => (value < 8 ? value * 2 : 16))}
          />
        </Flex>
        <Box width={300}>
          <Video
            aspectRatio={540 / 960}
            controls
            onControlsPlay={() => setPlaying(true)}
            onControlsPause={() => setPlaying(false)}
            onVolumeChange={(e) => setVolume(e.volume)}
            onPlay={() => setPlaying(true)}
            onPlayError={({ error }) => error && setPlaying(false)}
            playbackRate={playbackRate}
            playing={playing}
            src={src}
            loop
            volume={volume}
          />
        </Box>
      </Flex>
    </Box>
  );
}
