// @flow strict
import { type Node } from 'react';
import { Box, Flex, Image, Link, Text, Toast } from 'gestalt';

export default function Example(): Node {
  return (
    <Box paddingY={4} width="100%" height="100%">
      <Flex alignItems="end" justifyContent="center" width="100%" height="100%">
        <Toast
          text={
            <Text inline>
              Saved to{' '}
              <Link
                display="inlineBlock"
                target="blank"
                href="https://www.pinterest.com/search/pins/?q=home%20decor"
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
