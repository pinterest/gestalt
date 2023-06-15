// @flow strict
import { type Node } from 'react';
import { Box, Flex, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex height="100%" alignItems="center">
      <Box
        className="This class name will not appear"
        style={{ backgroundColor: 'orange' }}
        color="infoBase"
        column={12}
        height={100}
        padding={4}
      >
        <Box
          onClick={() => {
            // eslint-disable-next-line no-console
            console.log("This won't get logged.");
          }}
          paddingX={1}
          color="successBase"
          height={50}
        >
          <Text color="light" weight="bold">
            Adding onClick here will do nothing
          </Text>
        </Box>
      </Box>
    </Flex>
  );
}
