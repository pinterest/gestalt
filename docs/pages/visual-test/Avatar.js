// @flow strict
import { type Node as ReactNode } from 'react';
import { Avatar, Box } from 'gestalt';

export default function Snapshot(): ReactNode {
  return (
    <Box color="default" display="inlineBlock" padding={1}>
      <Avatar verified size="xl" name="Keerthi" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" />
    </Box>
  );
}
