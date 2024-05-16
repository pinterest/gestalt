import { IconButton } from 'gestalt';

type Props = {
  size?: 'xs' | 'sm';
};

export default function InternalOnlyIconButton({ size = 'xs' }: Props) {
  return (
    <IconButton
      accessibilityLabel="Internal only"
      icon="lock"
      padding={1}
      size={size}
      tooltip={{
        text: 'Access is restricted to Pinterest employees.',
        inline: true,
        idealDirection: 'up',
      }}
    />
  );
}
