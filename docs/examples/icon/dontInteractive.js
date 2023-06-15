// @flow strict
import { type Node } from 'react';
import { Flex, Icon, TapArea, Tooltip } from 'gestalt';

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
