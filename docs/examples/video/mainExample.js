// @flow strict
import { type Node } from 'react';
import { Box, Video } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Box width={300}>
        <Video
          aspectRatio={540 / 960}
          controls
          onPlayError={() => {}}
          onPlay={() => {}}
          src="https://v.pinimg.com/videos/mc/expMp4/c8/37/71/c83771d856bc1ee12e2d2f81083df9d4_t1.mp4"
        />
      </Box>
    </Box>
  );
}
