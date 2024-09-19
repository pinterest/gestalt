import { useState } from 'react';
import classnames from 'classnames';
import {
  TOKEN_COLOR_BACKGROUND_AVATAR_PLACEHOLDER,
  TOKEN_COLOR_BORDER_AVATAR,
} from 'gestalt-design-tokens';
import avatarStyles from './Avatar/AvatarFoundation.css';
import DefaultAvatar from './Avatar/DefaultAvatar';
import Box from './Box';
import Icon from './Icon';
import Image from './Image';
import Mask from './Mask';
import useInExperiment from './useInExperiment';

const sizes = {
  xs: 24,
  sm: 32,
  md: 48,
  lg: 64,
  xl: 120,
} as const;

interface InternalProps {
  isFocused?: boolean;
  isFocusVisible?: boolean;
  isHovered?: boolean;
  isPressed?: boolean;
}

interface DocumentedProps {
  /**
   * String that clients such as VoiceOver will read to describe the element. Will default to `name` prop if not provided.
   */
  accessibilityLabel?: string;
  /**
   * The background color chosen by the user. A default color will be used if none is selected.
   */
  avatarColor?: '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10';
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
}

type Props = DocumentedProps & Partial<InternalProps>;

type Props = DocumentedProps & Partial<InternalProps>;

/**
 * [Avatar](https://gestalt.pinterest.systems/web/avatar) is used to represent a user. Every Avatar image has a subtle color wash.
 *
 * ![Avatar light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Avatar.spec.ts-snapshots/Avatar-chromium-darwin.png)
 * ![Avatar dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Avatar-dark.spec.ts-snapshots/Avatar-dark-chromium-darwin.png)
 *
 */

function Avatar(props: Props) {
  const isInVRExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });
  const {
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
    outline,
    size = isInVRExperiment ? 'md' : 'fit',
    src,
    verified,
  } = props;
  const [isImageLoaded, setIsImageLoaded] = useState(true);
  const handleImageError = () => setIsImageLoaded(false);
  const width = size === 'fit' ? '100%' : sizes[size];
  const height = size === 'fit' ? '' : sizes[size];
<<<<<<< HEAD
<<<<<<< HEAD
=======
  const { handleOnBlur, handleOnFocus, isFocused } = useInteractiveStates();
  const { isFocusVisible } = useFocusVisible();
>>>>>>> 950395011 (fixed focus outline)
=======
>>>>>>> b81f81405 (fixed prop naming)

  return (
    <div
      className={classnames({
        [avatarStyles.outline]: !isInVRExperiment && outline,
        [avatarStyles.outlineVR]: isInVRExperiment && outline,
<<<<<<< HEAD
<<<<<<< HEAD
      })}
=======
        [avatarStyles.focused]: isInVRExperiment && isFocused && isFocusVisible,
=======
>>>>>>> b81f81405 (fixed prop naming)
      })}
<<<<<<< HEAD
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
>>>>>>> 950395011 (fixed focus outline)
=======
>>>>>>> ed3635c15 (removed focus from regular avatar)
    >
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
            <div
              className={classnames({
                [avatarStyles.imageHovered]: isInVRExperiment && isHovered,
                [avatarStyles.imagePressed]: isInVRExperiment && isPressed,
              })}
            >
              <Image
                alt={accessibilityLabel ?? name}
                color={TOKEN_COLOR_BACKGROUND_AVATAR_PLACEHOLDER}
                naturalHeight={1}
                naturalWidth={1}
                onError={handleImageError}
                src={src}
              />
            </div>
          </Mask>
        ) : (
          <DefaultAvatar
            accessibilityLabel={accessibilityLabel}
<<<<<<< HEAD
<<<<<<< HEAD
            avatarColor={avatarColor}
=======
            avatarColorIndex={avatarColorIndex}
>>>>>>> 950395011 (fixed focus outline)
=======
            avatarColor={avatarColor}
>>>>>>> b81f81405 (fixed prop naming)
            isHovered={isHovered}
            isPressed={isPressed}
            name={name}
          />
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
    </div>
  );
}

Avatar.displayName = 'Avatar';

export default Avatar;
