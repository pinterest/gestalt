import { ReactNode, useState } from 'react';
import { Box, Flex, IconButton, RadioButton, Tooltip } from 'gestalt';

export default function ExampleTooltip() {
  const [idealDirection, setIdealDirection] = useState('down');

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex alignItems="center" direction="column" gap={{ column: 8, row: 0 }}>
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
        {/* @ts-expect-error - TS2322 - Type 'string' is not assignable to type 'FourDirections | undefined'. */}
        <Tooltip accessibilityLabel="" idealDirection={idealDirection} inline text="Share">
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
