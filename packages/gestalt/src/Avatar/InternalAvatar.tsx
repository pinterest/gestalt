import { useState } from 'react';
import classnames from 'classnames';
import {
  TOKEN_COLOR_BACKGROUND_AVATAR_PLACEHOLDER,
  TOKEN_COLOR_BACKGROUND_DEFAULT,
  TOKEN_SPACE_0,
} from 'gestalt-design-tokens';
import avatarStyles from './AvatarFoundation.css';
import DefaultAvatar from './DefaultAvatar';
import Box from '../Box';
import Icon from '../Icon';
import IconCompact from '../IconCompact';
import Image from '../Image';
import Mask from '../Mask';
import useExperimentalTheme from '../utils/useExperimentalTheme';

const sizes = {
  xs: 24,
  sm: 32,
  md: 48,
  lg: 64,
  xl: 120,
} as const;

const verifiedIconSizes = {
  xs: 14,
  sm: 14,
  md: 14,
  lg: 16,
  xl: 24,
  fit: 14,
} as const;

type Props = {
  accessibilityLabel?: string;
  color?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  isHovered?: boolean;
  isPressed?: boolean;
  name: string;
  outline?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'fit';
  src?: string;
  verified?: boolean;
};

function InternalAvatar(props: Props) {
  const theme = useExperimentalTheme();
  const {
    accessibilityLabel,
    color,
    isHovered,
    isPressed,
    name,
    outline,
    size = 'fit',
    src,
    verified,
  } = props;
  const [isImageLoaded, setIsImageLoaded] = useState(true);
  const handleImageError = () => setIsImageLoaded(false);
  const width = size === 'fit' ? '100%' : sizes[size];
  const height = size === 'fit' ? '' : sizes[size];

  const verifiedIconPadding = {
    xs: TOKEN_SPACE_0,
    sm: TOKEN_SPACE_0,
    md: TOKEN_SPACE_0,
    lg: theme.MAIN ? 'var(--sema-space-50)' : '2px',
    xl: '5px',
    fit: TOKEN_SPACE_0,
  } as const;

  return (
    <Box
      dangerouslySetInlineStyle={{
        __style: outline
          ? {
              outline: theme.MAIN
                ? '1px solid var(--sema-color-border-inverse)'
                : '1px solid rgb(255 255 255)',
            }
          : {},
      }}
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
              [avatarStyles.imageHovered]: theme.MAIN && isHovered,
              [avatarStyles.imagePressed]: theme.MAIN && isPressed,
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
          color={color}
          isHovered={isHovered}
          isPressed={isPressed}
          name={name}
        />
      )}

      {verified && (
        <Box
          color="default"
          dangerouslySetInlineStyle={{
            __style:
              size === 'xl'
                ? {
                    bottom: verifiedIconPadding[size],
                    right: verifiedIconPadding[size],
                    outline: theme.MAIN
                      ? '1px solid var(--sema-color-background-default)'
                      : `1px solid ${TOKEN_COLOR_BACKGROUND_DEFAULT}`,
                  }
                : {
                    bottom: verifiedIconPadding[size],
                    right: verifiedIconPadding[size],
                  },
          }}
          height={size === 'fit' ? '25%' : verifiedIconSizes[size]}
          minHeight={size === 'fit' ? verifiedIconSizes[size] : undefined}
          minWidth={size === 'fit' ? verifiedIconSizes[size] : undefined}
          position="absolute"
          rounding="circle"
          width={size === 'fit' ? '25%' : verifiedIconSizes[size]}
        >
          {size === 'xl' ? (
            <Icon accessibilityLabel="" color="brandPrimary" icon="check-circle-fill" size="100%" />
          ) : (
            <IconCompact
              accessibilityLabel=""
              color="brandPrimary"
              icon="compact-check-circle-fill"
              size="100%"
            />
          )}
        </Box>
      )}
    </Box>
  );
}

export default InternalAvatar;
