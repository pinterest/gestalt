// @flow strict
import { type Node } from 'react';
import { Tooltip, Icon, Flex } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Tooltip text="Built-in Gestalt Icon">
        <Icon accessibilityLabel="Go to next steps" icon="directional-arrow-right" />
      </Tooltip>
    </Flex>
  );
}
