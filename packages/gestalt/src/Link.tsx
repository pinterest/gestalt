import {
  ComponentProps,
  forwardRef,
  ReactElement,
  ReactNode,
  Ref,
  useImperativeHandle,
  useRef,
} from 'react';
import classnames from 'classnames';
import AccessibilityLinkActionIcon from './accessibility/AccessibilityLinkActionIcon';
import getAriaLabel from './accessibility/getAriaLabel';
import Box from './Box';
import { useDefaultLabelContext } from './contexts/DefaultLabelProvider';
import { useGlobalEventsHandlerContext } from './contexts/GlobalEventsHandlerProvider';
import focusStyles from './Focus.css';
import getRoundingClassName from './getRoundingClassName';
import layoutStyles from './Layout.css';
import touchableStyles from './TapArea.css';
import Text from './Text';
import styles from './Text.css';
import typographyStyles from './Typography.css';
import useFocusVisible from './useFocusVisible';
import useInExperiment from './useInExperiment';
import useTapFeedback, { keyPressShouldTriggerTap } from './useTapFeedback';
import { icon } from './Icon.css';

const externalLinkIconMap = {
  '100': 12,
  '200': 14,
  '300': 16,
  '400': 20,
  '500': 28,
  '600': 36,
  sm: 12,
  md: 14,
  lg: 16,
} as const;

type ExternalLinkIcon =
  | 'none'
  | 'default'
  | {
      size: ComponentProps<typeof Text>['size'];
    };

type Rounding = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'circle' | 'pill';

type Props = {
  /**
   * Supply a short, descriptive label for screen-readers to replace link texts that don't provide sufficient context about the link component behavior. Texts like "Click Here", or "Read More" can be confusing when a screen reader reads them out of context. In those cases, we must pass an alternative text to replace the link text. It populates `aria-label`. Screen readers read the `accessibilityLabel` prop, if present, instead of the link text. See the [Accessibility guidelines](https://gestalt.pinterest.systems/web/link#Accessibility) for more information.
   */
  accessibilityLabel?: string;
  /**
   * Link is a wrapper around components (or children), most commonly text, so that they become hyperlinks. See the [Text and Link variant](https://gestalt.pinterest.systems/web/link#Link-and-Text) to learn more.
   */
  children?: ReactNode;
  /**
   * Available for testing purposes, if needed. Consider [better queries](https://testing-library.com/docs/queries/about/#priority) before using this prop.
   */
  dataTestId?: string;
  /**
   * Determines how Link is positioned relative to surrounding elements, such as [Text](https://gestalt.pinterest.systems/web/text). See the [inline variant](https://gestalt.pinterest.systems/web/link#Inline) to learn more.
   */
  display?: 'inline' | 'inlineBlock' | 'block';
  /**
   * When supplied, a "visit" icon is shown at the end of Link. See the [externalLinkIcon and rel variant](https://gestalt.pinterest.systems/web/link#externalLinkIcon-and-rel) to learn more.
   */
  externalLinkIcon?: ExternalLinkIcon;
  /**
   * The URL that the hyperlink points to.
   */
  href: string;
  /**
   * Unique id attribute of the anchor tag.
   */
  id?: string;
  /**
   * Callback triggered when when the element loses focus.
   */
  onBlur?: (arg1: { event: React.FocusEvent<HTMLAnchorElement> }) => void;
  /**
   * Callback fired when Link is clicked (pressed and released) with a mouse or keyboard. See [GlobalEventsHandlerProvider](https://gestalt.pinterest.systems/web/utilities/globaleventshandlerprovider#Link-handlers) to learn more about link navigation.
   */
  onClick?: (arg1: {
    event: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>;
    dangerouslyDisableOnNavigation: () => void;
  }) => void;
  /**
   * Callback triggered when the element gains focus.
   */
  onFocus?: (arg1: { event: React.FocusEvent<HTMLAnchorElement> }) => void;
  /**
   * Ref that is forwarded to the underlying anchor element.
   */
  ref?: Ref<'a'>;
  /**
   * Establishes the relationship of the linked URL. Use `rel="nofollow"` for offsite links to inform search engines to ignore and not follow them. See the [externalLinkIcon and rel variant](https://gestalt.pinterest.systems/web/link#externalLinkIcon-and-rel) to learn more.
   */
  rel?: 'none' | 'nofollow';
  /**
   * Sets a border radius for Link. Select a rounding option that aligns with its children.
   */
  rounding?: Rounding;
  /**
   * When `compress` is supplied, Link is visually compressed on click.
   */
  tapStyle?: 'none' | 'compress';
  /**
     * Define the frame or window to open the anchor defined on href:
  - 'null' opens the anchor in the same window.
  - 'blank' opens the anchor in a new window.
  - 'self' opens an anchor in the same frame.

  See the [target variant](https://gestalt.pinterest.systems/web/link#Target) to learn more.
     */
  target?: null | 'self' | 'blank';
  /**
   * When `underline` is supplied, we override the underline style internally managed by the component. See the [underline variant](https://gestalt.pinterest.systems/web/link#Underline) to learn more.
   */
  underline?: 'auto' | 'none' | 'always' | 'hover';
};

/**
 * [Link](https://gestalt.pinterest.systems/web/link) is mainly used as navigational element and usually appear within or directly following a paragraph or sentence.
 *
 * ![Link light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Link.spec.ts-snapshots/Link-chromium-darwin.png)
 * ![Link dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Link-dark.spec.ts-snapshots/Link-dark-chromium-darwin.png)
 *
 */
const LinkWithForwardRef = forwardRef<HTMLAnchorElement, Props>(function Link(
  {
    accessibilityLabel,
    children,
    dataTestId,
    display = 'block',
    externalLinkIcon = 'none',
    href,
    id,
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
): ReactElement {
  const innerRef = useRef<null | HTMLAnchorElement>(null);

  const isInVRExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });

  // @ts-expect-error - TS2322 - Type 'HTMLAnchorElement | null' is not assignable to type 'HTMLAnchorElement'.
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

  const { accessibilityNewTabLabel } = useDefaultLabelContext('Link');

  const { isFocusVisible } = useFocusVisible();

  const isInline = ['inline', 'inlineBlock'].includes(display);

  let underlineStyle = isInline ? 'always' : 'hover';

  if (underline && underline !== 'auto') {
    underlineStyle = underline;
  }

  const className = classnames(
    styles.noOutline,
    styles.inheritColor,
    getRoundingClassName(rounding),
    layoutStyles[display],
    touchableStyles.tapTransition,
    {
      [styles.hoverNoUnderline]: underlineStyle === 'always',
      [styles.hoverUnderline]: underlineStyle === 'hover',
      [styles.underline]: underlineStyle === 'always',
      [styles.noUnderline]: underlineStyle === 'hover' || underlineStyle === 'none',
      [styles.outlineFocus]: isFocusVisible,
      [focusStyles.hideOutline]: !isFocusVisible,
      [touchableStyles.tapCompress]: tapStyle === 'compress' && isTapping,
    },
  );

  const VRclassName = classnames(
    styles.noOutline,
    styles.inheritColor,
    getRoundingClassName(rounding),
    layoutStyles[display],
    touchableStyles.tapTransition,
    {
      [styles.vrInheritColor]: isInline,
      [styles.standalone]: !isInline,
      [styles.underline]: underlineStyle === 'always',
      [styles.noUnderline]: underlineStyle === 'hover' || underlineStyle === 'none',
      [styles.hoverUnderline]: underlineStyle === 'hover',
      [styles.outlineFocusVR]: isFocusVisible,
      [typographyStyles.fontWeightSemiBold]: !isInline,
      [focusStyles.hideOutline]: !isFocusVisible,
      [touchableStyles.tapCompress]: tapStyle === 'compress' && isTapping,
    },
  );

  // Consumes GlobalEventsHandlerProvider
  const { linkHandlers } = useGlobalEventsHandlerContext() ?? {
    linkHandlers: { onNavigation: undefined },
  };

  const { onNavigation } = linkHandlers ?? { onNavigation: undefined };

  const onNavigationHandler = onNavigation?.({ href, target });

  const handleKeyPress = (event: React.KeyboardEvent<HTMLAnchorElement>) => {
    // Check to see if space or enter were pressed
    if (onClick && keyPressShouldTriggerTap(event)) {
      // Prevent the default action to stop scrolling when space is pressed
      event.preventDefault();
      onClick({ event, dangerouslyDisableOnNavigation: () => {} });
    }
  };

  const ariaLabel = getAriaLabel({
    target,
    accessibilityLabel,
    accessibilityNewTabLabel,
  });

  return (
    <a
      ref={innerRef}
      aria-label={ariaLabel}
      className={isInVRExperiment ? VRclassName : className}
      data-test-id={dataTestId}
      href={href}
      id={id}
      onBlur={(event) => {
        handleBlur();
        onBlur?.({ event });
      }}
      onClick={(event) => {
        let defaultOnNavigationIsEnabled = true;
        const dangerouslyDisableOnNavigation = () => {
          defaultOnNavigationIsEnabled = false;
        };

        onClick?.({
          event,
          dangerouslyDisableOnNavigation,
        });

        if (onNavigationHandler && defaultOnNavigationIsEnabled) {
          onNavigationHandler({ event });
        }
      }}
      onFocus={(event) => {
        onFocus?.({ event });
      }}
      onKeyPress={handleKeyPress}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchCancel={handleTouchCancel}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
      rel={[
        ...(target === 'blank' ? ['noopener', 'noreferrer'] : []),
        ...(rel === 'nofollow' ? ['nofollow'] : []),
      ].join(' ')}
      {...(compressStyle && tapStyle === 'compress' ? { style: compressStyle } : {})}
      target={target ? `_${target}` : undefined}
    >
      {children}
      {externalLinkIcon === 'none' ? null : (
        <Box display="inlineBlock" marginStart={1}>
          <AccessibilityLinkActionIcon
            size={
              externalLinkIcon === 'default'
                ? externalLinkIconMap['300']
                : externalLinkIconMap[externalLinkIcon?.size ?? '300']
            }
            icon="visit"
          />
        </Box>
      )}
    </a>
  );
});

LinkWithForwardRef.displayName = 'Link';

export default LinkWithForwardRef;
