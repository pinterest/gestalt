import AvatarFoundation from './Foundation';

type Props = {
  accessibilityLabel?: string;
  color?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  isHovered?: boolean;
  isPressed?: boolean;
  name: string;
};

export default function DefaultAvatar({
  accessibilityLabel,
  color,
  isHovered,
  isPressed,
  name,
}: Props) {
  const firstInitial = name ? Array.from(name)[0]?.toUpperCase() : '';
  const title = accessibilityLabel ?? name;

  return (
    <AvatarFoundation
      color={color}
      fontSize="40px"
      isHovered={isHovered}
      isPressed={isPressed}
      textAnchor="middle"
      title={title}
    >
      {firstInitial}
    </AvatarFoundation>
  );
}
