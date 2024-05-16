import {ReactNode} from 'react';
import { Flex, Icon, Text } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex alignItems="center" gap={2}>
        <Icon accessibilityLabel="Pin" color="default" icon="pin" />
        <Text align="center" color="default" weight="bold">
          Pinterest
        </Text>
      </Flex>
    </Flex>
  );
}
