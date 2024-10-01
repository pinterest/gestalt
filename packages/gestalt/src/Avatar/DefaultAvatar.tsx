import AvatarFoundation from './Foundation';

type Props = {
  accessibilityLabel?: string;
  color?: '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10';
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
