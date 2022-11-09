// @flow strict
import { type Node } from 'react';
import { Icon, Flex, Tooltip, TapArea } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Tooltip text="Share pin" accessibilityLabel="">
        <TapArea>
          <Icon icon="share" accessibilityLabel="Share Pin" color="default" />
        </TapArea>
      </Tooltip>
    </Flex>
  );
}
