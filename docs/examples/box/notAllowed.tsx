import {ReactNode} from 'react';
import { Box, Flex, Text } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%">
      <Box
        className="This class name will not appear"
        color="infoBase"
        column={12}
        height={100}
        padding={4}
        style={{ backgroundColor: 'orange' }}
      >
        <Box
          color="successBase"
          height={50}
          onClick={() => {
            // eslint-disable-next-line no-console
            console.log("This won't get logged.");
          }}
          paddingX={1}
        >
          <Text color="light" weight="bold">
            Adding onClick here will do nothing
          </Text>
        </Box>
      </Box>
    </Flex>
  );
}
