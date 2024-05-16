import {ReactNode, useState} from 'react';
import { Box, Button, Flex, Label, Text, TextField, Video } from 'gestalt';

export default function Example() {
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
    <Box display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex direction="column" gap={{ column: 2, row: 0 }} width="100%">
        <Label htmlFor="video-source">
          <Text>Video source URL</Text>
        </Label>
        <Flex alignItems="center" gap={{ row: 2, column: 0 }} width="100%">
          <Flex.Item flex="grow">
            <TextField id="video-source" onChange={({ value }) => setInput(value)} value={input} />
          </Flex.Item>
          <Button color="red" onClick={() => setSrc(input)} text="Submit" />
        </Flex>
        <Flex gap={{ column: 0, row: 2 }}>
          <Button
            onClick={() => setVolume(volume === 0 ? 1 : 0)}
            text={volume === 0 ? 'Unmute' : 'Mute'}
          />
          <Button
            onClick={() => setPlaybackRate((value) => (value >= 1 ? value / 2 : 0.5))}
            text="Playback x0.5"
          />
          <Button
            onClick={() => setPlaybackRate((value) => (value < 8 ? value * 2 : 16))}
            text="Playback x2"
          />
        </Flex>
        <Box width={300}>
          <Video
            aspectRatio={540 / 960}
            controls
            loop
            onControlsPause={() => setPlaying(false)}
            onControlsPlay={() => setPlaying(true)}
            onPlay={() => setPlaying(true)}
            onPlayError={({ error }) => error && setPlaying(false)}
            onVolumeChange={(e) => setVolume(e.volume)}
            playbackRate={playbackRate}
            playing={playing}
            src={src}
            volume={volume}
          />
        </Box>
      </Flex>
    </Box>
  );
}
