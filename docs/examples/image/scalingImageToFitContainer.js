// @flow strict
import { type Node } from 'react';
import { Box, Flex, Image, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8}>
      <Flex alignItems="start" direction="column" gap={{ column: 6, row: 0 }} wrap>
        <Flex direction="column" gap={2}>
          <Text weight="bold" size="300">
            Square content: contain vs cover
          </Text>
          <Flex gap={8} justifyContent="around" wrap>
            <Box color="dark" height={200} width={200}>
              <Image
                alt="square"
                color="#000"
                fit="contain"
                naturalHeight={1}
                naturalWidth={1}
                src="https://i.ibb.co/d0pQsJz/stock3.jpg"
              />
            </Box>
            <Box color="dark" height={200} width={200}>
              <Image
                alt="square"
                color="#000"
                fit="cover"
                naturalHeight={1}
                naturalWidth={1}
                src="https://i.ibb.co/d0pQsJz/stock3.jpg"
              />
            </Box>
          </Flex>
        </Flex>

        <Flex direction="column" gap={{ column: 2, row: 0 }}>
          <Text weight="bold" size="300">
            Wide content: contain vs cover
          </Text>
          <Flex gap={8} justifyContent="around" wrap>
            <Box color="dark" height={200} width={200}>
              <Image
                alt="wide"
                color="#000"
                fit="contain"
                naturalHeight={1}
                naturalWidth={1}
                src="https://i.ibb.co/SB0pXgS/stock4.jpg"
              />
            </Box>
            <Box color="dark" height={200} width={200}>
              <Image
                alt="wide"
                color="#000"
                fit="cover"
                naturalHeight={1}
                naturalWidth={1}
                src="https://i.ibb.co/SB0pXgS/stock4.jpg"
              />
            </Box>
          </Flex>
        </Flex>

        <Flex direction="column" gap={{ column: 2, row: 0 }}>
          <Text weight="bold" size="300">
            Tall content: contain vs cover
          </Text>
          <Flex gap={8} justifyContent="around" wrap>
            <Box color="dark" height={200} width={200}>
              <Image
                alt="tall"
                color="#000"
                fit="contain"
                naturalHeight={1}
                naturalWidth={1}
                src="https://i.ibb.co/jVR29XV/stock5.jpg"
              />
            </Box>
            <Box color="dark" height={200} width={200}>
              <Image
                alt="tall"
                color="#000"
                fit="cover"
                naturalHeight={1}
                naturalWidth={1}
                src="https://i.ibb.co/jVR29XV/stock5.jpg"
              />
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
