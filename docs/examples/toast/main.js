// @flow strict
import { type Node } from 'react';
import { Flex, Image, Link, Text, Toast } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex justifyContent="center" alignItems="center" width="100%" height="100%">
      <Toast
        text={
          <Text inline>
            Saved to{' '}
            <Link display="inlineBlock" target="blank" href="#">
              Sushi time
            </Link>
          </Text>
        }
        dismissButton={{ onDismiss: () => {} }}
        thumbnail={{
          image: (
            <Image
              alt="Vegan Teriyaki Sushi Burrito"
              naturalHeight={1}
              naturalWidth={1}
              src="https://i.pinimg.com/564x/ff/ee/52/ffee52eac6cd0f2f5dac8af3899a9f41.jpg"
            />
          ),
        }}
      />
    </Flex>
  );
}
