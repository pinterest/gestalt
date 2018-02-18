import React, { isValidElement } from 'react';
import Box from '../../../src/Box/Box';
import Heading from '../../../src/Heading/Heading';
import StateRecorder from './StateRecorder';

const parseArgs = args => {
  let name;
  let parts = [];
  let options = {};
  let i = 0;

  if (typeof args[0] === 'string') {
    [name] = args;
    i += 1;
  }

  while (
    i < args.length &&
    (isValidElement(args[i]) || typeof args[i] !== 'object')
  ) {
    parts = [...parts, args[i]];
    i += 1;
  }

  if (i < args.length) {
    options = {
      ...options,
      ...args[i],
    };
    i += 1;
  }

  return {
    name,
    parts,
    options,
  };
};

export default ({ args }) => {
  const {
    name,
    parts,
    options: {
      heading = true,
      history = false,
      initialState = {},
      inspectData = false,
      stacked = false,
    },
  } = parseArgs(args);

  return (
    <Box>
      {heading && <Heading size="xs">{name}</Heading>}
      <Box
        marginLeft={-2}
        marginRight={-2}
        display="flex"
        direction={stacked ? 'column' : 'row'}
      >
        {parts.map((part, i) => (
          <Box paddingX={2} column={12} key={i}>
            {part}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
