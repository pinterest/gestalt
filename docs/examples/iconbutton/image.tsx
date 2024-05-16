import {ReactNode} from 'react';
import { Box, Flex, IconButton, Image, Mask } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Box height={250} paddingX={2} width={250}>
        <Mask rounding={6} wash>
          <Image
            alt="Tropic greens: The taste of Petrol and Porcelain | Interior design, Vintage Sets and Unique Pieces agave"
            naturalHeight={1}
            naturalWidth={1}
            src="https://i.ibb.co/x65Wctf/image.jpg"
          >
            <Box alignItems="end" display="flex" height="100%" justifyContent="end" padding={3}>
              <IconButton accessibilityLabel="Share pin" icon="share" iconColor="white" size="md" />
            </Box>
          </Image>
        </Mask>
      </Box>
    </Flex>
  );
}
