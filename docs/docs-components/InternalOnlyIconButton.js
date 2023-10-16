// @flow strict
import { type Node } from 'react';
import { IconButton } from 'gestalt';

type Props = {
  size?: 'xs' | 'sm',
};

export default function InternalOnlyIconButton({ size = 'xs' }: Props): Node {
  return (
    <IconButton
      accessibilityLabel="Internal only"
      size={size}
      icon="lock"
      padding={1}
      tooltip={{
        text: 'Access is restricted to Pinterest employees.',
        inline: true,
        idealDirection: 'up',
      }}
    />
  );
}
