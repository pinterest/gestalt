import { ReactNode, useState } from 'react';
import { Box, Button, ButtonGroup, Flex, Label, Text } from 'gestalt';

export default function Example() {
  const [width, setWidth] = useState(150);

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex alignItems="center" direction="column" gap={8} width="100%">
        <Flex gap={2}>
          <Label htmlFor="Width">
            <Text>Container width: {width}px</Text>
          </Label>
          <input
            max="300"
            min="150"
            name="Width"
            onChange={(event) => setWidth(parseInt(event.target.value, 10))}
            type="range"
            value={width}
          />
        </Flex>

        <Box borderStyle="sm" width={width}>
          <ButtonGroup>
            <Button text="Button 1" />
            <Button text="Button 2" />
            <Button text="Button 3" />
          </ButtonGroup>
        </Box>
      </Flex>
    </Flex>
  );
}
