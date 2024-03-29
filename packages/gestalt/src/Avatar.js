// @flow strict
import { type Node as ReactNode, useState } from 'react';
import {
  TOKEN_COLOR_BACKGROUND_AVATAR_PLACEHOLDER,
  TOKEN_COLOR_BORDER_AVATAR,
} from 'gestalt-design-tokens';
import DefaultAvatar from './Avatar/DefaultAvatar';
import Box from './Box';
import Icon from './Icon';
import Image from './Image';
import Mask from './Mask';

const sizes = {
  xs: 24,
  sm: 32,
  md: 48,
  lg: 64,
  xl: 120,
};

type Props = {
  /**
   * String that clients such as VoiceOver will read to describe the element. Will default to `name` prop if not provided.
   */
  accessibilityLabel?: string,
  /**
   * The name of the user. This is used for the placeholder treatment if an image is not available.
   */
  name: string,
  /**
   * Adds a white border around Avatar so it's visible when displayed on other images.
   */
  outline?: boolean,
  /**
   * xs: 24px, sm: 32px, md: 48px, lg: 64px, xl: 120px. If size is `fit`, Avatar will fill 100% of the parent container width.
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'fit',
  /**
   * The URL of the user's image.
   */
  src?: string,
  /**
   * Used to indicate if the user is verified.
   */
  verified?: boolean,
};

/**
 * [Avatar](https://gestalt.pinterest.systems/web/avatar) is used to represent a user. Every Avatar image has a subtle color wash.
 *
 * ![Avatar light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Avatar.spec.mjs-snapshots/Avatar-chromium-darwin.png)
 * ![Avatar dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Avatar-dark.spec.mjs-snapshots/Avatar-dark-chromium-darwin.png)
 *
 */

function Avatar(props: Props): ReactNode {
  const [isImageLoaded, setIsImageLoaded] = useState(true);
  const { accessibilityLabel, name, outline, size = 'fit', src, verified } = props;
  const width = size === 'fit' ? '100%' : sizes[size];
  const height = size === 'fit' ? '' : sizes[size];

  const handleImageError = () => setIsImageLoaded(false);

  return (
    <Box
      {...(outline
        ? {
            dangerouslySetInlineStyle: {
              __style: {
                boxShadow: `0 0 0 1px ${TOKEN_COLOR_BORDER_AVATAR}`,
              },
            },
          }
        : {})}
      data-test-id="gestalt-avatar-svg"
      height={height}
      position="relative"
      rounding="circle"
      width={width}
    >
      {src && isImageLoaded ? (
        <Mask rounding="circle" wash>
          <Image
            alt={accessibilityLabel ?? name}
            color={TOKEN_COLOR_BACKGROUND_AVATAR_PLACEHOLDER}
            naturalHeight={1}
            naturalWidth={1}
            onError={handleImageError}
            src={src}
          />
        </Mask>
      ) : (
        <DefaultAvatar accessibilityLabel={accessibilityLabel} name={name} />
      )}

      {verified && (
        <Box
          dangerouslySetInlineStyle={{
            __style: {
              bottom: '4%',
              right: '4%',
            },
          }}
          height="25%"
          minHeight={12}
          minWidth={12}
          position="absolute"
          width="25%"
        >
          <Box color="default" height="100%" rounding="circle" width="100%">
            <Icon accessibilityLabel="" color="brandPrimary" icon="check-circle" size="100%" />
          </Box>
        </Box>
      )}
    </Box>
  );
}

Avatar.displayName = 'Avatar';

export default Avatar;
