import { PureComponent, ReactNode } from 'react';
import classnames from 'classnames';
import Box from './Box';
import styles from './Image.css';

type Fit = 'cover' | 'contain' | 'none';

const shouldScaleImage = (fit?: Fit | null) => fit === 'cover' || fit === 'contain';

type Props = {
  /**
   * Alt text read by screen readers. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/alt) for more details.
   */
  alt: string;
  /**
   * Children content will be overlaid on the image.  See the [Overlay example](https://gestalt.pinterest.systems/web/image#Overlay) for more details.
   */
  children?: ReactNode;
  /**
   * Used as a visual placeholder while the image is loading.  See the [Placeholders example](https://gestalt.pinterest.systems/web/image#placeholders) for more details.
   */
  color: string;
  /**
   * Specifies the CORS setting to use when retrieving the image. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/crossOrigin) for more details.
   */
  crossOrigin?: 'anonymous' | 'use-credentials';
  /**
   * Available for testing purposes, if needed. Consider [better queries](https://testing-library.com/docs/queries/about/#priority) before using this prop.
   */
  dataTestId?: string;
  /**
   * Sends a hint to the browser specifying whether or not it is allowed to try to parallelize loading your image. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/decoding) for more details.
   */
  decoding?: 'sync' | 'async' | 'auto';
  /**
   * HTML attribute for performance profiling (see https://developer.mozilla.org/en-US/docs/Web/API/Element_timing_API). Note that it only works if the \`fit\` prop is not set to \`"cover"\` or \`"contain"\`.
   */
  elementTiming?: string;
  /**
   * Priority hints provide developers a way to indicate a resource's relative importance to the browser, allowing more control over the order resources are loaded (only available via Chrome Origin Trial). \`"high"\`: the developer considers the resource to be high priority. \`"low"\`: the developer considers the resource to be low priority. \`auto\` the developer does not indicate a preference.
   * Note that this feature is currently experimental; please see the [attribute spec](https://wicg.github.io/priority-hints/) for more details.
   */
  fetchPriority?: 'high' | 'low' | 'auto';
  /**
   * Sets how the image is resized to fit its container. See the [Fit example](https://gestalt.pinterest.systems/web/image#fit) for more details.
   * Note: this doesn't work with srcSet or sizes.
   */
  fit?: Fit;
  /**
   * Controls if loading the image should be deferred when it's off-screen. \`"lazy"\` defers the load until the image or iframe reaches a distance threshold from the viewport. \`"eager"\` loads the resource immediately. \`"auto"\` uses the default behavior, which is to eagerly load the resource. See the [Lazy example](https://gestalt.pinterest.systems/web/image#Lazy) for more details.
   */
  loading?: 'eager' | 'lazy' | 'auto';
  /**
   * Exact height of source image. See the [Dimensions example](https://gestalt.pinterest.systems/web/image#Dimensions) for more details.
   */
  naturalHeight: number;
  /**
   * Exact width of source image. See the [Dimensions example](https://gestalt.pinterest.systems/web/image#Dimensions) for more details.
   */
  naturalWidth: number;
  /**
   * Callback fired when the image loading has an error.
   */
  onError?: (arg1: { event: React.SyntheticEvent<HTMLImageElement> }) => void;
  /**
   * Callback fired when the image successfully loads.
   */
  onLoad?: (arg1: { event: React.SyntheticEvent<HTMLImageElement> }) => void;
  /**
   * When Image is used purely as a presentational or decorative addition, the \`role\` should be set to "presentation" for better accessibility. See the [Presentational Images with Role example](https://gestalt.pinterest.systems/web/image#Presentational-Images-with-Role) for more details.
   */
  role?: 'img' | 'presentation';
  /**
   * A comma-separated list of one or more strings indicating a set of source sizes.
   */
  sizes?: string;
  /**
   * The URL for the image.
   */
  src: string;
  /**
   * A comma-separated list of one or more strings indicating a set of possible image sources for the user agent to use.
   */
  srcSet?: string;
  /**
   * Experimental prop: Fixes an issue where onLoad is not triggered if the image is already loaded by the time the component renders (i.e. SSR)
   */
  _fixCompletedOnLoad?: boolean;
};

/**
 * [Image](https://gestalt.pinterest.systems/web/image) is the workhorse of Pinterest. If you define Pinterest to be all about collecting ideas, then images are how we choose to represent those ideas. In response, we've added a few extra superpowers to the regular img tag to make it even more awesome.
 *
 * ![Image light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Image.spec.ts-snapshots/Image-chromium-darwin.png)
 * ![Image dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Image-dark.spec.ts-snapshots/Image-dark-chromium-darwin.png)
 *
 */
export default class Image extends PureComponent<Props> {
  static defaultProps: {
    color: string;
    dataTestId?: string;
    fetchPriority?: 'high' | 'low' | 'auto';
    fit?: 'contain' | 'cover' | 'none';
    loading?: 'eager' | 'lazy' | 'auto';
  } = {
    color: 'transparent',
    fetchPriority: 'auto',
    fit: 'none',
    loading: 'auto',
  };

  static displayName: string | null | undefined = 'Image';

  onLoadCalled: boolean = false;

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

  handleLoad: (event: React.SyntheticEvent<HTMLImageElement>) => void = (event) => {
    this.onLoadCalled = true;
    this.props.onLoad?.({ event });
  };

  handleError: (event: React.SyntheticEvent<HTMLImageElement>) => void = (event) => {
    this.props.onError?.({ event });
  };

  loadImage() {
    if (typeof window !== 'undefined') {
      const image = new window.Image();
      // @ts-expect-error - TS2322 - Type '(event: SyntheticEvent<HTMLImageElement, Event>) => void' is not assignable to type '(this: GlobalEventHandlers, ev: Event) => any'.
      image.onload = this.handleLoad;
      // @ts-expect-error - TS2322 - Type '(event: SyntheticEvent<HTMLImageElement, Event>) => void' is not assignable to type 'OnErrorEventHandler'.
      image.onerror = this.handleError;
      image.src = this.props.src;
    }
  }

  refCallback = (node: HTMLImageElement | null) => {
    const { _fixCompletedOnLoad } = this.props;
    // For certain scenarios, such as server-side rendering, the image may already be loaded by the time the component is rendered resulting in the onLoad event not being triggered.
    // To address these, we can use a ref callback and check whether the image is already loaded - if it is, we trigger the onLoad event manually.
    if (_fixCompletedOnLoad && node?.complete && !this.onLoadCalled) {
      // Since we don't have the SyntheticEvent here,
      // we must create one with the same shape.
      // See https://reactjs.org/docs/events.html
      const loadEvent = new Event('load');
      Object.defineProperty(loadEvent, 'target', { writable: false, value: node });
      this.handleLoad({
        ...loadEvent,
        nativeEvent: loadEvent,
        currentTarget: node,
        target: node,
        isDefaultPrevented: () => false,
        isPropagationStopped: () => false,
        persist: () => {},
        preventDefault: () => {},
        stopPropagation: () => {},
      });
    }
  };

  render() {
    const {
      alt,
      color,
      children,
      crossOrigin,
      dataTestId,
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
      <Box bottom left overflow="hidden" position="absolute" right top>
        {children}
      </Box>
    ) : null;

    const isScaledImage = shouldScaleImage(fit);
    const fitStyles = fit === 'cover' || fit === 'contain' ? styles.scaledImg : undefined;
    const imageStyles = classnames(styles.img, fitStyles);
    const elementTimingValue: {
      elementtiming?: string;
    } = elementTiming ? { elementtiming: elementTiming } : {};
    const styleValue = isScaledImage ? { style: { objectFit: fit } } : {};
    const conditionalProps = {
      ...elementTimingValue,
      ...styleValue,
    } as const;

    return (
      <Box
        dangerouslySetInlineStyle={{
          __style: {
            backgroundColor: color,
            paddingBottom: isScaledImage ? undefined : `${(naturalHeight / naturalWidth) * 100}%`,
          },
        }}
        position="relative"
        {...(isScaledImage ? { height: '100%' } : {})}
      >
        <img
          ref={this.refCallback}
          alt={alt}
          className={imageStyles}
          crossOrigin={crossOrigin}
          data-test-id={dataTestId}
          decoding={decoding}
          fetchpriority={fetchPriority}
          // @ts-expect-error - TS2322 - Type '"auto" | "lazy" | "eager" | undefined' is not assignable to type '"lazy" | "eager" | undefined'.
          loading={loading}
          onError={this.handleError}
          onLoad={this.handleLoad}
          role={role === 'presentation' ? 'presentation' : undefined}
          sizes={sizes}
          src={src}
          srcSet={srcSet}
          {...conditionalProps}
        />
        {childContent}
      </Box>
    );
  }
}
