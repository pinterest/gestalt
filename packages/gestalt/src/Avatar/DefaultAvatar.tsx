import AvatarFoundation from './Foundation';

type Props = {
  accessibilityLabel?: string;
<<<<<<< HEAD
<<<<<<< HEAD
  avatarColor?: '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10';
=======
  avatarColorIndex?: '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10';
>>>>>>> 950395011 (fixed focus outline)
=======
  avatarColor?: '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10';
>>>>>>> b81f81405 (fixed prop naming)
  isHovered?: boolean;
  isPressed?: boolean;
  name: string;
};

export default function DefaultAvatar({
  accessibilityLabel,
<<<<<<< HEAD
<<<<<<< HEAD
  avatarColor,
=======
  avatarColorIndex,
>>>>>>> 950395011 (fixed focus outline)
=======
  avatarColor,
>>>>>>> b81f81405 (fixed prop naming)
  isHovered,
  isPressed,
  name,
}: Props) {
  const firstInitial = name ? Array.from(name)[0]?.toUpperCase() : '';
  const title = accessibilityLabel ?? name;

  return (
    <AvatarFoundation
      avatarColor={avatarColor}
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
