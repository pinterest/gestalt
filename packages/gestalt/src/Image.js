// @flow strict
import { PureComponent, type Node } from 'react';
import Box from './Box.js';
import styles from './Image.css';

const shouldScaleImage = (fit) => fit === 'cover' || fit === 'contain';

type Props = {|
  /**
   * Alt text read by screen readers. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/alt) for more details.
   */
  alt: string,
  /**
   * Children content will be overlaid on the image.  See the [Overlay example](https://gestalt.pinterest.systems/image#Overlay) for more details.
   */
  children?: Node,
  /**
   * Used as a visual placeholder while the image is loading.  See the [Placeholders example](https://gestalt.pinterest.systems/image#placeholders) for more details.
   */
  color: string,
  /**
   * Specifies the CORS setting to use when retrieving the image. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/crossOrigin) for more details.
   */
  crossOrigin?: 'anonymous' | 'use-credentials',
  /**
   * HTML attribute for performance profiling (see https://developer.mozilla.org/en-US/docs/Web/API/Element_timing_API). Note that it only works if the \`fit\` prop is not set to \`"cover"\` or \`"contain"\`.
   */
  elementTiming?: string,
  /**
   * Sets how the image is resized to fit its container. See the [Fit example](https://gestalt.pinterest.systems/image#fit) for more details.
   * Note: this doesn't work with srcSet or sizes.
   */
  fit?: 'contain' | 'cover' | 'none',
  /**
   * Priority hints provide developers a way to indicate a resource's relative importance to the browser, allowing more control over the order resources are loaded (only available via Chrome Origin Trial). \`"high"\`: the developer considers the resource to be high priority. \`"low"\`: the developer considers the resource to be low priority. \`auto\` the developer does not indicate a preference.
   * Note that this feature is currently experimental; please see the [attribute spec](https://wicg.github.io/priority-hints/) for more details.
   */
  importance?: 'high' | 'low' | 'auto',
  /**
   * Controls if loading the image should be deferred when it's off-screen. \`"lazy"\` defers the load until the image or iframe reaches a distance threshold from the viewport. \`"eager"\` loads the resource immediately. \`"auto"\` uses the default behavior, which is to eagerly load the resource. See the [Lazy example](https://gestalt.pinterest.systems/image#Lazy) for more details.
   */
  loading?: 'eager' | 'lazy' | 'auto',
  /**
   * Exact height of source image. See the [Dimensions example](https://gestalt.pinterest.systems/image#Dimensions) for more details.
   */
  naturalHeight: number,
  /**
   * Exact width of source image. See the [Dimensions example](https://gestalt.pinterest.systems/image#Dimensions) for more details.
   */
  naturalWidth: number,
  /**
   * Callback fired when the image loading has an error.
   */
  onError?: () => void,
  /**
   * Callback fired when the image successfully loads.
   */
  onLoad?: () => void,
  /**
   * When Image is used purely as a presentational or decorative addition, the \`role\` should be set to "presentation" for better accessibility. See the [Presentational Images with Role example](https://gestalt.pinterest.systems/image#Presentational-Images-with-Role) for more details.
   */
  role?: 'img' | 'presentation',
  /**
   * A comma-separated list of one or more strings indicating a set of source sizes.
   */
  sizes?: string,
  /**
   * The URL for the image.
   */
  src: string,
  /**
   * A comma-separated list of one or more strings indicating a set of possible image sources for the user agent to use.
   */
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
    // eslint-disable-next-line react/default-props-match-prop-types
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
