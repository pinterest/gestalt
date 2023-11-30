// @flow strict
import { type Node as ReactNode } from 'react';
import { Badge, Box, Flex, Image, Mask } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" gap={4} height="100%" justifyContent="center" width="100%">
      <Mask height={150} width={280} rounding={2}>
        <Image
          alt="Botanical art in coral and green"
          fit="cover"
          src="https://i.ibb.co/cbjgZft/img-door.jpg"
          naturalWidth={1}
          naturalHeight={1}
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
