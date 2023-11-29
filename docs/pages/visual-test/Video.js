// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Video } from 'gestalt';

export default function Snapshot(): ReactNode {
  return (
    <Box width={500}>
      <Video
        aspectRatio={100 / 50}
        captions=""
        controls
        onPlay={() => {}}
        onPlayError={() => {}}
        poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
        src="https://media.w3.org/2010/05/bunny/movie.mp4"
      />
    </Box>
  );
}
