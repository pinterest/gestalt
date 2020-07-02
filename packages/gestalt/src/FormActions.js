// @flow strict
import * as React from 'react';
import Box from './Box.js';
import Row from './Row.js';
import Button from './Button.js';

export default function FormActions(): React.Node {
  return (
    <Box padding={2}>
      <Row>
        <Button text="Cancel" />
        <Box grow />
        <Button text="Submit" />
      </Row>
    </Box>
  );
}
