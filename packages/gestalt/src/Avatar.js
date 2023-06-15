// @flow strict
import { type Node, useState } from 'react';
import DefaultAvatar from './Avatar/DefaultAvatar.js';
import Box from './Box.js';
import { useColorScheme } from './contexts/ColorSchemeProvider.js';
import Icon from './Icon.js';
import Image from './Image.js';
import Mask from './Mask.js';

const sizes = {
  xs: 24,
  sm: 32,
  md: 48,
  lg: 64,
  xl: 120,
};

type Props = {|
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
|};

/**
 * [Avatar](https://gestalt.pinterest.systems/web/avatar) is used to represent a user. Every Avatar image has a subtle color wash.
 *
 * ![Avatar light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Avatar.spec.mjs-snapshots/Avatar-chromium-darwin.png)
 * ![Avatar dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Avatar-dark.spec.mjs-snapshots/Avatar-dark-chromium-darwin.png)
 *
 */

function Avatar(props: Props): Node {
  const [isImageLoaded, setIsImageLoaded] = useState(true);
  const { colorGray0, colorGray100 } = useColorScheme();
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
                boxShadow: `0 0 0 1px ${colorGray0}`,
              },
            },
          }
        : {})}
      width={width}
      height={height}
      position="relative"
      rounding="circle"
      data-test-id="gestalt-avatar-svg"
    >
      {src && isImageLoaded ? (
        <Mask rounding="circle" wash>
          <Image
            alt={accessibilityLabel ?? name}
            color={colorGray100}
            naturalHeight={1}
            naturalWidth={1}
            src={src}
            onError={handleImageError}
          />
        </Mask>
      ) : (
        <DefaultAvatar accessibilityLabel={accessibilityLabel} name={name} />
      )}

      {verified && (
        <Box
          position="absolute"
          width="25%"
          height="25%"
          minWidth={12}
          minHeight={12}
          dangerouslySetInlineStyle={{
            __style: {
              bottom: '4%',
              right: '4%',
            },
          }}
        >
          <Box color="default" width="100%" height="100%" rounding="circle">
            <Icon color="brandPrimary" icon="check-circle" accessibilityLabel="" size="100%" />
          </Box>
        </Box>
      )}
    </Box>
  );
}

Avatar.displayName = 'Avatar';

export default Avatar;
