import { ReactNode } from 'react';
import { IconButton } from 'gestalt';
import trackButtonClick from './trackButtonClick';

type Props = {
  expanded: boolean;
  name: string;
  onClick: () => void;
};

export default function ShowHideEditorButton({ expanded, name, onClick }: Props) {
  const label = `${expanded ? 'Hide' : 'Show'} code`;

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
