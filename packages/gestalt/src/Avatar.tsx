import InternalAvatar from './Avatar/InternalAvatar';

type Props = {
  /**
   * String that clients such as VoiceOver will read to describe the element. Will default to `name` prop if not provided.
   */
  accessibilityLabel?: string;
  /**
   * The background color chosen by the user. A default color will be used if none is selected.
   */
  color?: '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10';
  /**
   * The name of the user. This is used for the placeholder treatment if an image is not available.
   */
  name: string;
  /**
   * Adds a white border around Avatar so it's visible when displayed on other images.
   */
  outline?: boolean;
  /**
   * xs: 24px, sm: 32px, md: 48px, lg: 64px, xl: 120px. If size is `fit`, Avatar will fill 100% of the parent container width.
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'fit';
  /**
   * The URL of the user's image.
   */
  src?: string;
  /**
   * Used to indicate if the user is verified.
   */
  verified?: boolean;
};

/**
 * [Avatar](https://gestalt.pinterest.systems/web/avatar) is used to represent a user. Every Avatar image has a subtle color wash.
 *
 * ![Avatar light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Avatar.spec.ts-snapshots/Avatar-chromium-darwin.png)
 * ![Avatar dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Avatar-dark.spec.ts-snapshots/Avatar-dark-chromium-darwin.png)
 *
 */

function Avatar({ accessibilityLabel, color, name, outline, size, src, verified }: Props) {
  return (
    <InternalAvatar
      accessibilityLabel={accessibilityLabel}
      color={color}
      name={name}
      outline={outline}
      size={size}
      src={src}
      verified={verified}
    />
  );
}

Avatar.displayName = 'Avatar';

export default Avatar;
