import { ReactNode } from 'react';
import { Badge, Box, Flex, Image, Mask } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" gap={4} height="100%" justifyContent="center" width="100%">
      <Mask height={150} rounding={2} width={280}>
        <Image
          alt="Botanical art in coral and green"
          fit="cover"
          naturalHeight={1}
          naturalWidth={1}
          src="https://i.ibb.co/cbjgZft/img-door.jpg"
        />
        <Box position="absolute" top>
          <Box padding={4}>
            <Badge text="Active" type="success" />
          </Box>
        </Box>
      </Mask>
    </Flex>
  );
}
