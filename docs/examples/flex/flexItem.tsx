import {ReactNode} from 'react';
import { Box, Button, Flex } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Box paddingX={2} paddingY={2} width="100%">
        <Flex alignItems="center" gap={4}>
          <Button text="Button 1" />
          <Flex.Item flex="grow">
            <Button text="Button 2" />
          </Flex.Item>
          <Button text="Button 3" />
        </Flex>
      </Box>
    </Flex>
  );
}
