// @flow strict
import { type Node } from 'react';
import { Box, Button, ButtonGroup } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <Box padding={1}>
      <ButtonGroup>
        <Button text="Button 1" />
        <Button text="Button 2" />
      </ButtonGroup>
    </Box>
  );
}
