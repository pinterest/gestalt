// @flow strict
import { type Node } from 'react';
import { Flex, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex width={350} direction="column" gap={{ column: 4, row: 0 }}>
        <Text>
          Pinterest is building a positive online space for creators. That’s why we made the{' '}
          <Text weight="bold" inline>
            Creator Code: A commitment to kindness for everyone on Pinterest.
          </Text>{' '}
          We expect everyone to follow these guidelines and lead with kindness when you create new
          content or interact with other people on Pinterest.
        </Text>
        <Text>
          Great content should highlight you and your ideas. Put your original spin on something and
          don’t be afraid to let your own perspective shine. For example:{' '}
          <Text italic inline>
            Fashion inspiration to freshen up a wardrobe.
          </Text>
        </Text>
      </Flex>
    </Flex>
  );
}
