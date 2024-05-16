import {ReactNode} from 'react';
import { Badge, Box, Flex, Image, Mask } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" gap={4} height="100%" justifyContent="center" width="100%">
      <Flex gap={{ column: 8, row: 4 }} wrap>
        <Mask height={150} rounding={2} width={280}>
          <Image
            alt="Botanical art in coral and green"
            fit="cover"
            naturalHeight={1}
            naturalWidth={1}
            src="https://i.ibb.co/cbjgZft/img-door.jpg"
          >
            <Box padding={4}>
              <Badge text="Light wash" type="lightWash" />
            </Box>
          </Image>
        </Mask>
        <Mask height={150} rounding={2} width={280}>
          <Image
            alt="Botanical art in coral and green"
            fit="cover"
            naturalHeight={1}
            naturalWidth={1}
            src="https://i.ibb.co/7bQQYkX/stock2.jpg"
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
