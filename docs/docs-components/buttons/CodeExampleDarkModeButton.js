// @flow strict
import { type Node } from 'react';
import { IconButton } from 'gestalt';
import trackButtonClick from './trackButtonClick.js';

type Props = {
  currentMode: 'light' | 'dark',
  onClick: () => void,
};

export default function CodeExampleDarkModeButton({ currentMode, onClick }: Props): Node {
  const label = `Toggle ${currentMode === 'dark' ? 'light' : 'dark'} mode for code example`;

  return (
    <IconButton
      accessibilityLabel={label}
      iconColor="darkGray"
      icon={currentMode === 'dark' ? 'sun' : 'moon'}
      onClick={() => {
        trackButtonClick('Toggle dark mode for code example');
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
