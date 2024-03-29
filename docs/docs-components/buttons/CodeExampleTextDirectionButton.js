// @flow strict
import { type Node as ReactNode } from 'react';
import { IconButton } from 'gestalt';
import trackButtonClick from './trackButtonClick';

type Props = {
  currentTextDirection: 'ltr' | 'rtl',
  onClick: () => void,
};

export default function CodeExampleTextDirectionButton({
  currentTextDirection,
  onClick,
}: Props): ReactNode {
  const label = 'Toggle text direction for code example';

  return (
    <IconButton
      accessibilityLabel={label}
      icon={currentTextDirection === 'ltr' ? 'text-align-right' : 'text-align-left'}
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
