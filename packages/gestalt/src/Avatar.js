// @flow strict
import { useState, type Node } from 'react';
import PropTypes from 'prop-types';
import Box from './Box.js';
import Icon from './Icon.js';
import Image from './Image.js';
import Mask from './Mask.js';
import { useColorScheme } from './contexts/ColorScheme.js';
import DefaultAvatar from './DefaultAvatar.js';

type Props = {|
  accessibilityLabel?: string,
  name: string,
  outline?: boolean,
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'fit',
  src?: string,
  verified?: boolean,
|};

const sizes = {
  xs: 24,
  sm: 32,
  md: 48,
  lg: 64,
  xl: 120,
};

export default function Avatar(props: Props): Node {
  const [isImageLoaded, setIsImageLoaded] = useState(true);
  const { colorGray0, colorGray100 } = useColorScheme();
  const { accessibilityLabel, name, outline, size = 'fit', src, verified } = props;
  const width = size === 'fit' ? '100%' : sizes[size];
  const height = size === 'fit' ? '' : sizes[size];

  const handleImageError = () => setIsImageLoaded(false);

  return (
    <Box
      color="white"
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
          <Box color="white" width="100%" height="100%" rounding="circle">
            <Icon color="red" icon="check-circle" accessibilityLabel="" size="100%" />
          </Box>
        </Box>
      )}
    </Box>
  );
}

Avatar.propTypes = {
  accessibilityLabel: PropTypes.string,
  name: PropTypes.string.isRequired,
  outline: PropTypes.bool,
  src: PropTypes.string,
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', 'fit']),
  verified: PropTypes.bool,
};
