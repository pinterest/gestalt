// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Flex, Image, Link, Text, Toast } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box height="100%" paddingY={4} width="100%">
      <Flex alignItems="end" height="100%" justifyContent="center" width="100%">
        <Toast
          primaryAction={{
            accessibilityLabel: 'Save to a board',
            label: 'Save to a board',
            role: 'button',
            onClick: () => {},
          }}
          text={
            <Text inline>
              The pin{' '}
              <Link
                display="inline"
                href="https://www.pinterest.com/search/pins/?q=home%20decor"
                target="blank"
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
