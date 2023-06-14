// @flow strict
import { type Node } from 'react';
import { Box, Flex, IconButton, Image, Mask } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex width="100%" height="100%" justifyContent="center" alignItems="center">
      <Box height={250} paddingX={2} width={250}>
        <Mask rounding={6} wash>
          <Image
            alt="Tropic greens: The taste of Petrol and Porcelain | Interior design, Vintage Sets and Unique Pieces agave"
            naturalHeight={1}
            naturalWidth={1}
            src="https://i.ibb.co/x65Wctf/image.jpg"
          >
            <Box height="100%" padding={3} display="flex" justifyContent="end" alignItems="end">
              <IconButton accessibilityLabel="Share pin" icon="share" size="md" iconColor="white" />
            </Box>
          </Image>
        </Mask>
      </Box>
    </Flex>
  );
}
