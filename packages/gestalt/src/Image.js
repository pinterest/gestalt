// @flow strict
import { type Node, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from './Box.js';
import styles from './Image.css';

const shouldScaleImage = (fit) => fit === 'cover' || fit === 'contain';

type Fit = 'contain' | 'cover' | 'none';
type Importance = 'high' | 'low' | 'auto';
type Loading = 'eager' | 'lazy' | 'auto';
type Role = 'img' | 'presentation';

type Props = {|
  alt: string,
  children?: Node,
  color?: string,
  elementTiming?: string,
  fit?: Fit,
  importance?: Importance,
  loading?: Loading,
  naturalHeight: number,
  naturalWidth: number,
  onError?: () => void,
  onLoad?: () => void,
  role?: Role,
  sizes?: string,
  src: string,
  srcSet?: string,
|};

/**
 * https://gestalt.pinterest.systems/Image
 */
export default function Image({
  alt,
  children,
  color = 'transparent',
  elementTiming,
  fit = 'none',
  importance = 'auto',
  loading = 'auto',
  naturalHeight,
  naturalWidth,
  onError,
  onLoad,
  role = 'img',
  sizes,
  src,
  srcSet,
}: Props): Node {
  const isScaledImage = shouldScaleImage(fit);

  const handleLoad = useCallback(() => {
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    onError?.();
  }, [onError]);

  const loadImage = useCallback(() => {
    if (typeof window !== 'undefined') {
      const image = new window.Image();
      image.onload = handleLoad;
      image.onerror = handleError;
      image.src = src;
    }
  }, [handleError, handleLoad, src]);

  useEffect(() => {
    if (isScaledImage) {
      loadImage();
    }
  }, [isScaledImage, loadImage, src]);

  const childContent = children ? (
    <Box position="absolute" top left bottom right overflow="hidden">
      {children}
    </Box>
  ) : null;

  return isScaledImage ? (
    <Box height="100%" position="relative">
      <div
        aria-label={role === 'presentation' ? undefined : alt}
        className={fit === 'contain' || fit === 'cover' ? styles[fit] : null}
        style={{
          backgroundColor: color,
          backgroundImage: `url('${src}')`,
        }}
        role={role}
      />
      {childContent}
    </Box>
  ) : (
    <Box
      position="relative"
      dangerouslySetInlineStyle={{
        __style: {
          backgroundColor: color,
          paddingBottom: `${(naturalHeight / naturalWidth) * 100}%`,
        },
      }}
    >
      <img
        alt={alt}
        className={styles.img}
        elementtiming={elementTiming}
        importance={importance}
        loading={loading}
        onError={handleError}
        onLoad={handleLoad}
        sizes={sizes}
        src={src}
        srcSet={srcSet}
        role={role === 'presentation' ? 'presentation' : undefined}
      />
      {childContent}
    </Box>
  );
}

Image.propTypes = {
  alt: PropTypes.string.isRequired,
  children: PropTypes.node,
  color: PropTypes.string,
  elementTiming: PropTypes.string,
  fit: (PropTypes.oneOf(['contain', 'cover', 'none']): React$PropType$Primitive<Fit>),
  importance: (PropTypes.oneOf(['high', 'low', 'auto']): React$PropType$Primitive<Importance>),
  loading: (PropTypes.oneOf(['eager', 'lazy', 'auto']): React$PropType$Primitive<Loading>),
  naturalHeight: PropTypes.number.isRequired,
  naturalWidth: PropTypes.number.isRequired,
  onError: PropTypes.func,
  onLoad: PropTypes.func,
  role: (PropTypes.oneOf(['img', 'presentation']): React$PropType$Primitive<Role>),
  sizes: PropTypes.string,
  src: PropTypes.string.isRequired,
  srcSet: PropTypes.string,
};
