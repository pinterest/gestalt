import {ReactNode} from 'react';
import { Flex, Icon } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Icon accessibilityLabel="Go to next steps" icon="directional-arrow-right" />
    </Flex>
  );
}
