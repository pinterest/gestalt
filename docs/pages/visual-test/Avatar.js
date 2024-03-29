// @flow strict
import { type Node as ReactNode } from 'react';
import { Avatar, Box } from 'gestalt';

export default function Snapshot(): ReactNode {
  return (
    <Box color="default" display="inlineBlock" padding={1}>
      <Avatar name="Keerthi" size="xl" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" verified />
    </Box>
  );
}
