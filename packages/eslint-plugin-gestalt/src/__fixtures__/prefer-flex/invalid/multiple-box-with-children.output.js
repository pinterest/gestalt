import { Fragment } from 'react';
import { Box, Flex } from 'gestalt';

export default function TestElement() {
  return (
    <Fragment>
      <Box marginBottom={3} rounding={2} />
      <Flex alignItems="center" justifyContent="start">
        <div />
        <Box>
          <div />
        </Box>
        {true && <Box />}
        {true ? <Box /> : <div />}
      </Flex>
    </Fragment>
  );
}
