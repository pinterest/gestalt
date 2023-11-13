// @flow strict
import { type Node as ReactNode } from 'react';
import { IconButton } from 'gestalt';
import trackButtonClick from './trackButtonClick.js';

type Props = {
  onClick: () => void,
};

export default function CopyCodeButton({ onClick }: Props): ReactNode {
  const label = 'Copy code';

  return (
    <IconButton
      accessibilityLabel={label}
      icon="copy-to-clipboard"
      iconColor="darkGray"
      onClick={() => {
        trackButtonClick(label);
        onClick();
      }}
      size="xs"
      tooltip={{
        text: label,
        inline: true,
        idealDirection: 'up',
        accessibilityLabel: '',
      }}
    />
  );
}
