// @flow strict
import React, { type Node, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Box from './Box.js';
import styles from './Image.css';
import usePrevious from './usePrevious.js';

const shouldScaleImage = fit => fit === 'cover' || fit === 'contain';

type Props = {|
  alt: string,
  children?: Node,
  color?: string,
  fit?: 'contain' | 'cover' | 'none',
  importance?: 'high' | 'low' | 'auto',
  loading?: 'eager' | 'lazy' | 'auto',
  naturalHeight: number,
  naturalWidth: number,
  onError?: () => void,
  onLoad?: () => void,
  sizes?: string,
  src: string,
  srcSet?: string,
|};

export default function Image({
  alt,
  children,
  color = 'transparent',
  fit = 'none',
  importance = 'auto',
  loading = 'auto',
  naturalHeight,
  naturalWidth,
  onError,
  onLoad,
  sizes,
  src,
  srcSet,
}: Props): Node {
  const handleLoad: () => void = useCallback(() => {
    if (onLoad) {
      onLoad();
    }
  }, [onLoad]);

  const handleError: () => void = useCallback(() => {
    if (onError) {
      onError();
    }
  }, [onError]);

  const loadImage = useCallback(() => {
    if (typeof window !== 'undefined') {
      const image = new window.Image();
      image.onload = handleLoad;
      image.onerror = handleError;
      image.src = src;
    }
  }, [handleError, handleLoad, src]);

  const previousSrc = usePrevious(src);

  useEffect(() => {
    if (shouldScaleImage(fit) && previousSrc !== src) {
      loadImage();
    }
  }, [fit, src, previousSrc, loadImage]);

  const isScaledImage = shouldScaleImage(fit);
  const childContent = children ? (
    <Box position="absolute" top left bottom right overflow="hidden">
      {children}
    </Box>
  ) : null;

  return isScaledImage ? (
    <div
      aria-label={alt}
      className={fit === 'contain' || fit === 'cover' ? styles[fit] : null}
      style={{
        backgroundColor: color,
        backgroundImage: `url('${src}')`,
      }}
      role="img"
    >
      {childContent}
    </div>
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
        importance={importance}
        loading={loading}
        onError={handleError}
        onLoad={handleLoad}
        sizes={sizes}
        src={src}
        srcSet={srcSet}
      />
      {childContent}
    </Box>
  );
}

Image.propTypes = {
  alt: PropTypes.string.isRequired,
  children: PropTypes.node,
  color: PropTypes.string,
  fit: PropTypes.oneOf(['contain', 'cover', 'none']),
  importance: PropTypes.oneOf(['high', 'low', 'auto']),
  loading: PropTypes.oneOf(['eager', 'lazy', 'auto']),
  naturalHeight: PropTypes.number.isRequired,
  naturalWidth: PropTypes.number.isRequired,
  onError: PropTypes.func,
  onLoad: PropTypes.func,
  sizes: PropTypes.string,
  src: PropTypes.string.isRequired,
  srcSet: PropTypes.string,
};
