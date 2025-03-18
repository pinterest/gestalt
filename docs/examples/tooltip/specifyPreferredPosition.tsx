import { useState } from 'react';
import { Box, Flex, IconButton, RadioGroup, Tooltip } from 'gestalt';

export default function ExampleTooltip() {
  const [idealDirection, setIdealDirection] = useState<
    'down' | 'up' | 'right' | 'left' | undefined
  >('down');

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex alignItems="center" direction="column" gap={{ column: 8, row: 0 }}>
        <Flex gap={{ column: 0, row: 4 }}>
          <RadioGroup id="idealDirection" legend="Ideal direction">
            <RadioGroup.RadioButton
              checked={idealDirection === 'up'}
              id="up"
              label="Up"
              name="idealDirection"
              onChange={() => setIdealDirection('up')}
              value="up"
            />
            <RadioGroup.RadioButton
              checked={idealDirection === 'right'}
              id="right"
              label="Right"
              name="idealDirection"
              onChange={() => setIdealDirection('right')}
              value="right"
            />
            <RadioGroup.RadioButton
              checked={idealDirection === 'down'}
              id="down"
              label="Down"
              name="idealDirection"
              onChange={() => setIdealDirection('down')}
              value="down"
            />
            <RadioGroup.RadioButton
              checked={idealDirection === 'left'}
              id="left"
              label="Left"
              name="idealDirection"
              onChange={() => setIdealDirection('left')}
              value="left"
            />
          </RadioGroup>
        </Flex>
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
