// @flow strict
import { type Node } from 'react';
import { Box, Flex, Image, Link, Text, Toast } from 'gestalt';

export default function Example(): Node {
  return (
    <Box paddingY={4} width="100%" height="100%">
      <Flex alignItems="end" justifyContent="center" width="100%" height="100%">
        <Toast
          primaryAction={{ accessibilityLabel: 'Save to a board', label: 'Save to a board' }}
          text={
            <Text inline>
              The pin{' '}
              <Link
                display="inline"
                target="blank"
                href="https://www.pinterest.com/search/pins/?q=home%20decor"
              >
                Wedding cakes for you
              </Link>{' '}
              was saved to your profile. Create a board and save it to a board instead.
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
