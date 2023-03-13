import { $ElementType } from 'utility-types';
import type { AbstractComponent, Node, Ref, ElementConfig } from 'react';
import Icon from './Icon';
import Text from './Text';
declare type ExternalLinkIcon =
  | 'none'
  | 'default'
  | {
      color: $ElementType<ElementConfig<typeof Icon>, 'color'>;
      size: $ElementType<ElementConfig<typeof Text>, 'size'>;
    };
declare type Rounding = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'circle' | 'pill';
declare type Props = {
  /**
   * Supply a short, descriptive label for screen-readers to replace link texts that don't provide sufficient context about the link component behavior. Texts like "Click Here", or "Read More" can be confusing when a screen reader reads them out of context. In those cases, we must pass an alternative text to replace the link text. It populates `aria-label`. Screen readers read the `accessibilityLabel` prop, if present, instead of the link text. See the [Accessibility guidelines](https://gestalt.pinterest.systems/web/link#Accessibility) for more information.
   */
  accessibilityLabel?: string;
  /**
   * Link is a wrapper around components (or children), most commonly text, so that they become hyperlinks. See the [Text and Link variant](https://gestalt.pinterest.systems/web/link#Link-and-Text) to learn more.
   */
  children?: Node;
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
  onBlur?: (arg0: { event: React.FocusEvent<HTMLAnchorElement> }) => void;
  /**
   * Callback fired when Link is clicked (pressed and released) with a mouse or keyboard. See [OnLinkNavigationProvider](https://gestalt.pinterest.systems/web/utilities/onlinknavigationprovider) to learn more about link navigation.
   */
  onClick?: (arg0: {
    event: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>;
    dangerouslyDisableOnNavigation: () => void;
  }) => void;
  /**
   * Callback triggered when the element gains focus.
   */
  onFocus?: (arg0: { event: React.FocusEvent<HTMLAnchorElement> }) => void;
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
 * ![Link light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Link.spec.mjs-snapshots/Link-chromium-darwin.png)
 * ![Link dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Link-dark.spec.mjs-snapshots/Link-dark-chromium-darwin.png)
 *
 */
declare const LinkWithForwardRef: AbstractComponent<Props, HTMLAnchorElement>;
export default LinkWithForwardRef;
