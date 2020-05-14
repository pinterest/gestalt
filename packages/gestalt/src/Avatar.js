// @flow strict
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from './Box.js';
import Icon from './Icon.js';
import Image from './Image.js';
import Mask from './Mask.js';
import PersonSvg from './icons/person.svg';
import typography from './Typography.css';

const Square = (props: *) => (
  <Box {...props} position="relative">
    <Box
      dangerouslySetInlineStyle={{ __style: { paddingBottom: '100%' } }}
      position="relative"
    />
    <Box position="absolute" top left bottom right>
      {props.children}
    </Box>
  </Box>
);

const DefaultAvatar = ({
  name,
  useDefaultIcon,
}: {|
  name: string,
  useDefaultIcon: boolean,
|}) => {
  const firstInitial = name ? [...name][0].toUpperCase() : '';
  return (
    <Square color="lightGray" rounding="circle" overflow="hidden">
      {useDefaultIcon || !firstInitial ? (
        <svg
          preserveAspectRatio="xMidYMid meet"
          role="img"
          version="1.1"
          viewBox="-3 -8 30 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          {name && <title>{name}</title>}
          <path d={PersonSvg} fill="#111" />
        </svg>
      ) : (
        <svg
          width="100%"
          viewBox="-50 -50 100 100"
          version="1.1"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>{name}</title>
          <text
            fontSize="40px"
            fill="#111"
            dy="0.35em"
            textAnchor="middle"
            className={[
              typography.antialiased,
              typography.sansSerif,
              typography.fontWeightBold,
            ].join(' ')}
          >
            {firstInitial}
          </text>
        </svg>
      )}
    </Square>
  );
};

type Props = {|
  name: string,
  outline?: boolean,
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'fit',
  src?: string,
  verified?: boolean,
  __dangerouslyUseDefaultIcon?: boolean,
|};

const sizes = {
  xs: 24,
  sm: 32,
  md: 48,
  lg: 64,
  xl: 120,
};

export default function Avatar(props: Props) {
  const [isImageLoaded, setIsImageLoaded] = React.useState(true);
  const {
    name,
    outline,
    size = 'fit',
    src,
    verified,
    __dangerouslyUseDefaultIcon: useDefaultIcon = false,
  } = props;
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
                boxShadow: '0 0 0 1px #fff',
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
            alt={name}
            color="#EFEFEF"
            naturalHeight={1}
            naturalWidth={1}
            src={src}
            onError={handleImageError}
          />
        </Mask>
      ) : (
        <DefaultAvatar name={name} useDefaultIcon={useDefaultIcon} />
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
            <Icon
              color="red"
              icon="check-circle"
              accessibilityLabel=""
              size="100%"
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}

Avatar.propTypes = {
  name: PropTypes.string.isRequired,
  outline: PropTypes.bool,
  src: PropTypes.string,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', 'fit']),
  verified: PropTypes.bool,
};
