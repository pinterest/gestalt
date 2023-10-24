// @flow strict
import { type Node } from 'react';
import { IconButton } from 'gestalt';
import trackButtonClick from './trackButtonClick.js';

type Props = {
  expanded: boolean,
  name: string,
  onClick: () => void,
};

export default function CollapseExpandCodeButton({ expanded, name, onClick }: Props): Node {
  const label = `${expanded ? 'Collapse' : 'Expand'} code example`;

  return (
    <IconButton
      accessibilityLabel={`${label} for ${name}`}
      iconColor="darkGray"
      icon={expanded ? 'minimize' : 'maximize'}
      onClick={() => {
        trackButtonClick(label, name);
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
