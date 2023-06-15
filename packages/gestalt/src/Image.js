// @flow strict
import { type Node, PureComponent } from 'react';
import classnames from 'classnames';
import Box from './Box.js';
import styles from './Image.css';

type Fit = 'cover' | 'contain' | 'none';

const shouldScaleImage = (fit: ?Fit) => fit === 'cover' || fit === 'contain';

type Props = {|
  /**
   * Alt text read by screen readers. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/alt) for more details.
   */
  alt: string,
  /**
   * Children content will be overlaid on the image.  See the [Overlay example](https://gestalt.pinterest.systems/web/image#Overlay) for more details.
   */
  children?: Node,
  /**
   * Used as a visual placeholder while the image is loading.  See the [Placeholders example](https://gestalt.pinterest.systems/web/image#placeholders) for more details.
   */
  color: string,
  /**
   * Specifies the CORS setting to use when retrieving the image. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/crossOrigin) for more details.
   */
  crossOrigin?: 'anonymous' | 'use-credentials',
  /**
   * Sends a hint to the browser specifying whether or not it is allowed to try to parallelize loading your image. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/decoding) for more details.
   */
  decoding?: 'sync' | 'async' | 'auto',
  /**
   * HTML attribute for performance profiling (see https://developer.mozilla.org/en-US/docs/Web/API/Element_timing_API). Note that it only works if the \`fit\` prop is not set to \`"cover"\` or \`"contain"\`.
   */
  elementTiming?: string,
  /**
   * Priority hints provide developers a way to indicate a resource's relative importance to the browser, allowing more control over the order resources are loaded (only available via Chrome Origin Trial). \`"high"\`: the developer considers the resource to be high priority. \`"low"\`: the developer considers the resource to be low priority. \`auto\` the developer does not indicate a preference.
   * Note that this feature is currently experimental; please see the [attribute spec](https://wicg.github.io/priority-hints/) for more details.
   */
  fetchPriority?: 'high' | 'low' | 'auto',
  /**
   * Sets how the image is resized to fit its container. See the [Fit example](https://gestalt.pinterest.systems/web/image#fit) for more details.
   * Note: this doesn't work with srcSet or sizes.
   */
  fit?: Fit,
  /**
   * Controls if loading the image should be deferred when it's off-screen. \`"lazy"\` defers the load until the image or iframe reaches a distance threshold from the viewport. \`"eager"\` loads the resource immediately. \`"auto"\` uses the default behavior, which is to eagerly load the resource. See the [Lazy example](https://gestalt.pinterest.systems/web/image#Lazy) for more details.
   */
  loading?: 'eager' | 'lazy' | 'auto',
  /**
   * Exact height of source image. See the [Dimensions example](https://gestalt.pinterest.systems/web/image#Dimensions) for more details.
   */
  naturalHeight: number,
  /**
   * Exact width of source image. See the [Dimensions example](https://gestalt.pinterest.systems/web/image#Dimensions) for more details.
   */
  naturalWidth: number,
  /**
   * Callback fired when the image loading has an error.
   */
  onError?: ({| event: SyntheticEvent<HTMLImageElement> |}) => void,
  /**
   * Callback fired when the image successfully loads.
   */
  onLoad?: ({| event: SyntheticEvent<HTMLImageElement> |}) => void,
  /**
   * When Image is used purely as a presentational or decorative addition, the \`role\` should be set to "presentation" for better accessibility. See the [Presentational Images with Role example](https://gestalt.pinterest.systems/web/image#Presentational-Images-with-Role) for more details.
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
 * [Image](https://gestalt.pinterest.systems/web/image) is the workhorse of Pinterest. If you define Pinterest to be all about collecting ideas, then images are how we choose to represent those ideas. In response, we've added a few extra superpowers to the regular img tag to make it even more awesome.
 *
 * ![Image light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Image.spec.mjs-snapshots/Image-chromium-darwin.png)
 * ![Image dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Image-dark.spec.mjs-snapshots/Image-dark-chromium-darwin.png)
 *
 */
export default class Image extends PureComponent<Props> {
  static defaultProps: {|
    color: string,
    fetchPriority?: 'high' | 'low' | 'auto',
    fit?: 'contain' | 'cover' | 'none',
    loading?: 'eager' | 'lazy' | 'auto',
  |} = {
    // eslint-disable-next-line react/default-props-match-prop-types
    color: 'transparent',
    fetchPriority: 'auto',
    fit: 'none',
    loading: 'auto',
  };

  static displayName: ?string = 'Image';

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

  handleLoad: (event: SyntheticEvent<HTMLImageElement>) => void = (event) => {
    this.props.onLoad?.({ event });
  };

  handleError: (event: SyntheticEvent<HTMLImageElement>) => void = (event) => {
    this.props.onError?.({ event });
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
      decoding,
      elementTiming,
      fetchPriority,
      fit,
      loading,
      naturalHeight,
      naturalWidth,
      role = 'img',
      sizes,
      src,
      srcSet,
    } = this.props;

    const childContent = children ? (
      <Box position="absolute" top left bottom right overflow="hidden">
        {children}
      </Box>
    ) : null;

    const isScaledImage = shouldScaleImage(fit);
    const fitStyles = fit === 'cover' || fit === 'contain' ? styles.scaledImg : undefined;
    const imageStyles = classnames(styles.img, fitStyles);

    return (
      <Box
        position="relative"
        dangerouslySetInlineStyle={{
          __style: {
            backgroundColor: color,
            paddingBottom: isScaledImage ? undefined : `${(naturalHeight / naturalWidth) * 100}%`,
          },
        }}
        {...(isScaledImage ? { height: '100%' } : {})}
      >
        <img
          alt={alt}
          className={imageStyles}
          crossOrigin={crossOrigin}
          decoding={decoding}
          elementtiming={elementTiming}
          fetchpriority={fetchPriority}
          loading={loading}
          onError={this.handleError}
          onLoad={this.handleLoad}
          role={role === 'presentation' ? 'presentation' : undefined}
          sizes={sizes}
          src={src}
          srcSet={srcSet}
          {...(isScaledImage ? { style: { objectFit: fit } } : {})}
        />
        {childContent}
      </Box>
    );
  }
}
