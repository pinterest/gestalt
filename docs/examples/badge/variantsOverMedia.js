// @flow strict
import { type Node } from 'react';
import { Badge, Box, Flex, Image, Mask } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex alignItems="center" gap={4} height="100%" justifyContent="center" width="100%">
      <Flex gap={{ column: 8, row: 4 }} wrap>
        <Mask height={150} width={280} rounding={2}>
          <Image
            alt="Botanical art in coral and green"
            fit="cover"
            src="https://i.ibb.co/cbjgZft/img-door.jpg"
            naturalWidth={1}
            naturalHeight={1}
          >
            <Box padding={4}>
              <Badge text="Light wash" type="lightWash" />
            </Box>
          </Image>
        </Mask>
        <Mask height={150} width={280} rounding={2}>
          <Image
            alt="Botanical art in coral and green"
            fit="cover"
            src="https://i.ibb.co/7bQQYkX/stock2.jpg"
            naturalWidth={1}
            naturalHeight={1}
          >
            <Box padding={4}>
              <Badge text="Dark wash" type="darkWash" />
            </Box>
          </Image>
        </Mask>
      </Flex>
    </Flex>
  );
}
