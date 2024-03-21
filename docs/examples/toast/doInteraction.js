// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Flex, Image, Link, Text, Toast } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box height="100%" paddingY={4} width="100%">
      <Flex alignItems="end" height="100%" justifyContent="center" width="100%">
        <Toast
          text={
            <Text inline>
              Saved to{' '}
              <Link
                display="inlineBlock"
                href="https://www.pinterest.com/search/pins/?q=home%20decor"
                target="blank"
              >
                Wedding cakes
              </Link>
            </Text>
          }
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
