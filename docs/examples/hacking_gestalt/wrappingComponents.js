// @flow strict
import { Flex, Text } from 'gestalt';

export default function Example(): React$Node {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Text color="error">
        <span style={{ fontFamily: 'cursive' }}>Custom text</span>
      </Text>
    </Flex>
  );
}
