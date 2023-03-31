// @flow strict
import { type Node, useState } from 'react';
import { Box, Button, ButtonGroup, Flex, Label, Text } from 'gestalt';

export default function Example(): Node {
  const [width, setWidth] = useState(150);

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex direction="column" gap={8} width="100%" alignItems="center">
        <Flex gap={2}>
          <Label htmlFor="Width">
            <Text>Container width: {width}px</Text>
          </Label>
          <input
            name="Width"
            type="range"
            min="150"
            max="300"
            value={width}
            onChange={(event) => setWidth(parseInt(event.target.value, 10))}
          />
        </Flex>

        <Box width={width} borderStyle="sm">
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
