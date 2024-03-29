// @flow strict
import { type Node as ReactNode } from 'react';
import { IconButton } from 'gestalt';
import trackButtonClick from './trackButtonClick';

type Props = {
  expanded: boolean,
  name: string,
  onClick: () => void,
};

export default function CollapseExpandCodeButton({ expanded, name, onClick }: Props): ReactNode {
  const label = `${expanded ? 'Collapse' : 'Expand'} code example`;

  return (
    <IconButton
      accessibilityLabel={`${label} for ${name}`}
      icon={expanded ? 'minimize' : 'maximize'}
      iconColor="darkGray"
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
