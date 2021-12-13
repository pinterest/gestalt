// @flow strict
import type { Node } from 'react';

import { PureComponent } from 'react';
import Box from './Box.js';
import styles from './Image.css';

const shouldScaleImage = (fit) => fit === 'cover' || fit === 'contain';

type Props = {|
  alt: string,
  children?: Node,
  color: string,
  crossOrigin?: 'anonymous' | 'use-credentials',
  elementTiming?: string,
  fit?: 'contain' | 'cover' | 'none',
  importance?: 'high' | 'low' | 'auto',
  loading?: 'eager' | 'lazy' | 'auto',
  naturalHeight: number,
  naturalWidth: number,
  onError?: () => void,
  onLoad?: () => void,
  role?: 'img' | 'presentation',
  sizes?: string,
  src: string,
  srcSet?: string,
|};

/**
 * [Image](https://gestalt.pinterest.systems/image) is the workhorse of Pinterest. If you define Pinterest to be all about collecting ideas, then images are how we choose to represent those ideas. In response, we've added a few extra superpowers to the regular img tag to make it even more awesome.
 */
export default class Image extends PureComponent<Props> {
  static defaultProps: {|
    color: string,
    fit?: 'contain' | 'cover' | 'none',
    importance?: 'high' | 'low' | 'auto',
    loading?: 'eager' | 'lazy' | 'auto',
  |} = {
    color: 'transparent',
    fit: 'none',
    importance: 'auto',
    loading: 'auto',
  };

  componentDidMount() {
    if (shouldScaleImage(this.props.fit)) {
      this.loadImage();
    }
  }

  componentDidUpdate(prevProps: Props) {
    const { fit, src } = this.props;
    if (shouldScaleImage(fit) && prevProps.src !== src) {
      this.loadImage();
    }
  }

  handleLoad: () => void = () => {
    if (this.props.onLoad) {
      this.props.onLoad();
    }
  };

  handleError: () => void = () => {
    if (this.props.onError) {
      this.props.onError();
    }
  };

  loadImage() {
    if (typeof window !== 'undefined') {
      const image = new window.Image();
      image.onload = this.handleLoad;
      image.onerror = this.handleError;
      image.src = this.props.src;
    }
  }

  render(): Node {
    const {
      alt,
      color,
      children,
      crossOrigin,
      elementTiming,
      fit,
      importance,
      loading,
      naturalHeight,
      naturalWidth,
      role = 'img',
      sizes,
      src,
      srcSet,
    } = this.props;

    const isScaledImage = shouldScaleImage(fit);
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
          crossOrigin={crossOrigin}
          elementtiming={elementTiming}
          importance={importance}
          loading={loading}
          onError={this.handleError}
          onLoad={this.handleLoad}
          sizes={sizes}
          src={src}
          srcSet={srcSet}
          role={role === 'presentation' ? 'presentation' : undefined}
        />
        {childContent}
      </Box>
    );
  }
}
