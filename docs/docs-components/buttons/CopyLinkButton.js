// @flow strict
import { type Node as ReactNode } from 'react';
import { IconButton } from 'gestalt';
import trackButtonClick from './trackButtonClick';

type Props = {
  name: string,
  onClick: () => void,
};

export default function CopyLinkButton({ name, onClick }: Props): ReactNode {
  const label = 'Copy link';

  return (
    <IconButton
      accessibilityLabel={`${label} to ${name}`}
      icon="link"
      iconColor="darkGray"
      onClick={() => {
        trackButtonClick(label, name);
        onClick();
      }}
      size="xs"
      tooltip={{ text: label, inline: true, accessibilityLabel: '' }}
    />
  );
}
