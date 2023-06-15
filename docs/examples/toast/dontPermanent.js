// @flow strict
import { type Node } from 'react';
import { Box, Flex, Image, Toast } from 'gestalt';

export default function Example(): Node {
  return (
    <Box paddingY={4} width="100%" height="100%">
      <Flex alignItems="end" justifyContent="center" width="100%" height="100%">
        <Toast
          primaryAction={{ accessibilityLabel: 'Edit your Pin', label: 'Edit' }}
          text="Pin saved to your profile! Next, add it to your board."
          thumbnail={{
            image: (
              <Image
                alt="Modern ceramic vase pin."
                naturalHeight={564}
                naturalWidth={564}
                src="https://i.ibb.co/Lx54BCT/stock1.jpg"
              />
            ),
          }}
        />
      </Flex>
    </Box>
  );
}
