// @flow strict
import { type Node } from 'react';
import { IconButton } from 'gestalt';
import trackButtonClick from './trackButtonClick.js';

type Props = {
  currentTextDirection: 'ltr' | 'rtl',
  onClick: () => void,
};

export default function CodeExampleTextDirectionButton({
  currentTextDirection,
  onClick,
}: Props): Node {
  const label = 'Toggle text direction for code example';

  return (
    <IconButton
      accessibilityLabel={label}
      iconColor="darkGray"
      icon={currentTextDirection === 'ltr' ? 'text-align-right' : 'text-align-left'}
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
