import AvatarFoundation from './Foundation';

type Props = {
  accessibilityLabel?: string;
  name: string;
};

export default function DefaultAvatar({ accessibilityLabel, name }: Props) {
  const firstInitial = (name && Array.from(name)[0]?.toUpperCase()) || '';
  const title = accessibilityLabel ?? name;

  return (
    <AvatarFoundation fontSize="40px" textAnchor="middle" title={title}>
      {firstInitial}
    </AvatarFoundation>
  );
}
