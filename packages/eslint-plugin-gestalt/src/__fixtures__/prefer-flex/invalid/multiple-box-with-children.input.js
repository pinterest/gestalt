import { Fragment } from 'react';
import { Box } from 'gestalt';

export default function TestElement() {
  return (
    <Fragment>
      <Box marginBottom={3} rounding={2} />
      <Box display="flex" alignItems="center">
        <div />
        <Box>
          <div />
        </Box>
        {true && <Box />}
        {true ? <Box /> : <div />}
      </Box>
    </Fragment>
  );
}
