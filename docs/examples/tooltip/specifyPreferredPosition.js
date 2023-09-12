// @flow strict
import { type Node, useState } from 'react';
import { Box, Flex, IconButton, RadioButton, Tooltip } from 'gestalt';

export default function ExampleTooltip(): Node {
  const [idealDirection, setIdealDirection] = useState('down');

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex direction="column" alignItems="center" gap={{ column: 8, row: 0 }}>
        <Flex gap={{ column: 0, row: 4 }}>
          <RadioButton
            checked={idealDirection === 'up'}
            id="up"
            label="Up"
            name="idealDirection"
            onChange={() => setIdealDirection('up')}
            value="up"
          />
          <RadioButton
            checked={idealDirection === 'right'}
            id="right"
            label="Right"
            name="idealDirection"
            onChange={() => setIdealDirection('right')}
            value="right"
          />
          <RadioButton
            checked={idealDirection === 'down'}
            id="down"
            label="Down"
            name="idealDirection"
            onChange={() => setIdealDirection('down')}
            value="down"
          />
          <RadioButton
            checked={idealDirection === 'left'}
            id="left"
            label="Left"
            name="idealDirection"
            onChange={() => setIdealDirection('left')}
            value="left"
          />
        </Flex>
        <Tooltip idealDirection={idealDirection} inline text="Share" accessibilityLabel="">
          <IconButton
            accessibilityLabel="Share this Pin"
            bgColor="white"
            icon="share"
            iconColor="darkGray"
            size="lg"
          />
        </Tooltip>
      </Flex>
    </Box>
  );
}
