// @flow strict
import { type Node } from 'react';
import { Box, IconButton, Video } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Box width={300}>
        <Video
          aspectRatio={540 / 960}
          controls
          src="https://v.pinimg.com/videos/mc/expMp4/c8/37/71/c83771d856bc1ee12e2d2f81083df9d4_t1.mp4"
          onPlay={() => {}}
          onPlayError={() => {}}
        >
          <Box
            width="100%"
            height="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            dangerouslySetInlineStyle={{ __style: { backgroundColor: 'rgba(0, 0, 0, 0.3)' } }}
          >
            <IconButton
              accessibilityLabel="Delete video"
              bgColor="white"
              icon="trash-can"
              size="lg"
            />
          </Box>
        </Video>
      </Box>
    </Box>
  );
}
