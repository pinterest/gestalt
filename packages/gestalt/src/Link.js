// @flow strict
import {
  forwardRef,
  useImperativeHandle,
  useRef,
  type AbstractComponent,
  type Node,
  type Element,
  type Ref,
} from 'react';
import classnames from 'classnames';
import { useOnLinkNavigation } from './contexts/OnLinkNavigationProvider.js';
import touchableStyles from './Touchable.css';
import styles from './Link.css';
import textStyles from './Typography.css';
import useTapFeedback, { keyPressShouldTriggerTap } from './useTapFeedback.js';
import getRoundingClassName from './getRoundingClassName.js';
import focusStyles from './Focus.css';
import useFocusVisible from './useFocusVisible.js';
import layoutStyles from './Layout.css';
import Icon from './Icon.js';
import Box from './Box.js';
import Text from './Text.js';

const externalLinkIconMap = {
  '100': 12,
  '200': 14,
  '300': 16,
  '400': 20,
  '500': 28,
  '600': 36,
  'sm': 12,
  'md': 14,
  'lg': 16,
};

type ExternalLinkIcon =
  | 'none'
  | 'default'
  | {|
      color: $ElementType<React$ElementConfig<typeof Icon>, 'color'>,
      size: $ElementType<React$ElementConfig<typeof Text>, 'size'>,
    |};

function ExternalIcon({ externalLinkIcon }: {| externalLinkIcon: ExternalLinkIcon |}): Node {
  return externalLinkIcon === 'none' ? null : (
    <Box aria-hidden display="inlineBlock" marginStart={1}>
      <Icon
        inline
        icon="visit"
        accessibilityLabel=""
        size={
          externalLinkIcon === 'default'
            ? externalLinkIconMap['300']
            : externalLinkIconMap[externalLinkIcon?.size ?? '300']
        }
        color={externalLinkIcon === 'default' ? 'default' : externalLinkIcon?.color ?? 'default'}
      />
    </Box>
  );
}

type Rounding = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'circle' | 'pill';

type Props = {|
  /**
   * Supply a short, descriptive label for screen-readers to replace link texts that don't provide sufficient context about the link component behavior. Texts like "Click Here", or "Read More" can be confusing when a screen reader reads them out of context. In those cases, we must pass an alternative text to replace the link text. It populates `aria-label`. Screen readers read the `accessibilityLabel` prop, if present, instead of the link text. See the [Accessibility guidelines](https://gestalt.pinterest.systems/link#Accessibility) for more information.
   */
  accessibilityLabel?: string,
  /**
   * Link is a wrapper around components (or children), most commonly text, so that they become hyperlinks. See the [Text and Link variant](https://gestalt.pinterest.systems/link#Link-and-Text) to learn more.
   */
  children?: Node,
  /**
   * When supplied, a "visit" icon is shown at the end of Link. See the [externalLinkIcon and rel variant](https://gestalt.pinterest.systems/link#externalLinkIcon-and-rel) to learn more.
   */
  externalLinkIcon?: ExternalLinkIcon,
  /**
   * The URL that the hyperlink points to.
   */
  href: string,
  /**
   * Unique id attribute of the anchor tag.
   */
  id?: string,
  /**
   * Properly positions Link relative to an inline element, such as [Text](https://gestalt.pinterest.systems/text), using the inline property. See the [underline variant](https://gestalt.pinterest.systems/link#Underline) to learn more.
   */
  inline?: boolean,
  /**
   * Callback triggered when when the element loses focus.
   */
  onBlur?: ({| event: SyntheticFocusEvent<HTMLAnchorElement> |}) => void,
  /**
   * Callback fired when Link is clicked (pressed and released) with a mouse or keyboard. See [OnLinkNavigationProvider](https://gestalt.pinterest.systems/onlinknavigationprovider) to learn more about link navigation.
   */
  onClick?: ({|
    event: SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement>,
    dangerouslyDisableOnNavigation: () => void,
  |}) => void,
  /**
   * Callback triggered when the element gains focus.
   */
  onFocus?: ({| event: SyntheticFocusEvent<HTMLAnchorElement> |}) => void,
  /**
   * Ref that is forwarded to the underlying anchor element.
   */
  ref?: Ref<'a'>,
  /**
   * Establishes the relationship of the linked URL. Use `rel="nofollow"` for offsite links to inform search engines to ignore and not follow them. See the [externalLinkIcon and rel variant](https://gestalt.pinterest.systems/link#externalLinkIcon-and-rel) to learn more.
   */
  rel?: 'none' | 'nofollow',
  /**
   * Sets a border radius for Link. Select a rounding option that aligns with its children.
   */
  rounding?: Rounding,
  /**
   * When `compress` is supplied, Link is visually compressed on click.
   */
  tapStyle?: 'none' | 'compress',
  /**
   * Define the frame or window to open the anchor defined on href:
- 'null' opens the anchor in the same window.
- 'blank' opens the anchor in a new window.
- 'self' opens an anchor in the same frame.

See the [target variant](https://gestalt.pinterest.systems/link#Target) to learn more.
   */
  target?: null | 'self' | 'blank',
  /**
   * When `underline` is supplied, we override the underline style internally managed by the component. See the [underline variant](https://gestalt.pinterest.systems/link#Underline) to learn more.
   */
  underline?: 'auto' | 'none' | 'always' | 'hover',
|};

/**
 * [Link](https://gestalt.pinterest.systems/link) is mainly used as navigational element and usually appear within or directly following a paragraph or sentence.
 *
 * ![Link light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Link.spec.mjs-snapshots/Link-chromium-darwin.png)
 * ![Link dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Link-dark.spec.mjs-snapshots/Link-dark-chromium-darwin.png)
 *
 */
const LinkWithForwardRef: AbstractComponent<Props, HTMLAnchorElement> = forwardRef<
  Props,
  HTMLAnchorElement,
>(function Link(
  {
    accessibilityLabel,
    children,
    externalLinkIcon = 'none',
    href,
    id,
    inline = false,
    onBlur,
    onClick,
    onFocus,
    rel = 'none',
    rounding = 0,
    underline = 'auto',
    tapStyle = 'none',
    target = null,
  }: Props,
  ref,
): Element<'a'> {
  const innerRef = useRef(null);

  useImperativeHandle(ref, () => innerRef.current);

  const {
    compressStyle,
    isTapping,
    handleBlur,
    handleMouseDown,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchCancel,
    handleTouchEnd,
  } = useTapFeedback({
    height: innerRef?.current?.clientHeight,
    width: innerRef?.current?.clientWidth,
  });

  const { isFocusVisible } = useFocusVisible();

  let underlineStyle = inline ? 'always' : 'hover';

  if (underline && underline !== 'auto') {
    underlineStyle = underline;
  }

  const className = classnames(
    styles.link,
    focusStyles.hideOutline,
    touchableStyles.tapTransition,
    getRoundingClassName(rounding),
    {
      [layoutStyles.inlineBlock]: inline,
      [layoutStyles.block]: !inline,
      [textStyles.underline]: underlineStyle === 'always',
      [styles.hoverNoUnderline]: underlineStyle === 'always',
      [textStyles.noUnderline]: underlineStyle === 'hover' || underlineStyle === 'none',
      [styles.hoverUnderline]: underlineStyle === 'hover',
      [focusStyles.accessibilityOutline]: isFocusVisible,
      [touchableStyles.tapCompress]: tapStyle === 'compress' && isTapping,
    },
  );

  // useOnNavigation is only accessible with Gestalt OnLinkNavigationProvider
  // and when onNavigation prop is passed to it
  const defaultOnNavigation = useOnLinkNavigation({ href, target });

  const handleKeyPress = (event) => {
    // Check to see if space or enter were pressed
    if (onClick && keyPressShouldTriggerTap(event)) {
      // Prevent the default action to stop scrolling when space is pressed
      event.preventDefault();
      onClick({ event, dangerouslyDisableOnNavigation: () => {} });
    }
  };

  return (
    <a
      aria-label={accessibilityLabel}
      className={className}
      href={href}
      id={id}
      onBlur={(event) => {
        handleBlur();
        if (onBlur) {
          onBlur({ event });
        }
      }}
      onClick={(event) => {
        let defaultOnNavigationIsEnabled = true;
        const dangerouslyDisableOnNavigation = () => {
          defaultOnNavigationIsEnabled = false;
        };

        if (onClick) {
          onClick({
            event,
            dangerouslyDisableOnNavigation,
          });
        }
        if (defaultOnNavigation && defaultOnNavigationIsEnabled) {
          defaultOnNavigation({ event });
        }
      }}
      onFocus={(event) => {
        if (onFocus) {
          onFocus({ event });
        }
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onKeyPress={handleKeyPress}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchCancel={handleTouchCancel}
      onTouchEnd={handleTouchEnd}
      ref={innerRef}
      rel={[
        ...(target === 'blank' ? ['noopener', 'noreferrer'] : []),
        ...(rel === 'nofollow' ? ['nofollow'] : []),
      ].join(' ')}
      {...(compressStyle && tapStyle === 'compress' ? { style: compressStyle } : {})}
      target={target ? `_${target}` : null}
    >
      {children}
      <ExternalIcon externalLinkIcon={externalLinkIcon} />
    </a>
  );
});

LinkWithForwardRef.displayName = 'Link';

export default LinkWithForwardRef;
