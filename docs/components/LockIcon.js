// @flow strict
import { type Node } from 'react';
import { Tooltip, TapArea, Icon } from 'gestalt';

const LockIcon = function LockIcon({ size }: {| size: 12 | 16 |}): Node {
  return (
    <Tooltip text="Access is restricted to Pinterest employees" accessibilityLabel="" inline>
      <TapArea rounding="circle" fullWidth={false}>
        <Icon
          accessibilityLabel="Access is restricted to Pinterest employees"
          icon="lock"
          size={size}
        />{' '}
      </TapArea>
    </Tooltip>
  );
};

export default LockIcon;
