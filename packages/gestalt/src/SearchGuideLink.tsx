import React, { cloneElement, forwardRef, ReactElement, useImperativeHandle, useRef } from 'react';
import classnames from 'classnames';
import Box from './Box';
import Flex from './Flex';
import InternalLink from './Link/InternalLink';
import styles from './SearchGuide.css';
import TextUI from './TextUI';
import useInExperiment from './useInExperiment';

type Props = {
  /**
   * Label for screen readers to announce SearchGuideLink. See the [Accessibility guidelines](https://gestalt.pinterest.systems/web/searchguide#ARIA-attributes) for details on proper usage.
   */
  accessibilityLabel?: string;
  /**
   * The background color of SearchGuideLink.
   * See the [color variant](https://gestalt.pinterest.systems/web/searchguide#Colors) for implementation guidance.
   */
  color?: '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11';
  /**
   * Available for testing purposes, if needed. Consider [better queries](https://testing-library.com/docs/queries/about/#priority) before using this prop.
   */
  dataTestId?: string;
  /**
   * Text to render inside the SearchGuideLink to convey the function and purpose of the SearchGuideLink.
   *
   * It can be empty, but is still required as a fallback to accessibilityLabel.
   */
  text: string;
  /**
   * The thumbnail prop is used to display an image or icon to the left of the text. See the [thumbnail variant](https://gestalt.pinterest.systems/web/searchguide#Thumbnail) to learn more.
   */
  thumbnail?:
    | { avatar: ReactElement }
    | { avatarGroup: ReactElement }
    | { image: ReactElement }
    | { icon: ReactElement };
  /**
   * Callback invoked when the user clicks (press and release) on ButtonLink with the mouse or keyboard.
   * See [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider#Link-handlers) to learn more about link navigation.
   */
  onClick?: (arg1: {
    event: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>;
    dangerouslyDisableOnNavigation: () => void;
  }) => void;
  /**
   * Use "-1" to remove ButtonLink from keyboard navigation. See the [Accessibility guidelines](/foundations/accessibility) to learn more.
   */
  tabIndex?: -1 | 0;
  /**
   * Specifies a link URL.
   */
  href: string;
  /**
   * Provides hints for SEO. See the [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#rel) to learn more.
   */
  rel?: 'none' | 'nofollow';
  /**
     * Indicates the browsing context where an href will be opened:
  - 'null' opens the anchor in the same window.
  - 'blank' opens the anchor in a new window.
  - 'self' opens an anchor in the same frame.
     */
  target?: null | 'self' | 'blank';
};

/**
 * [SearchGuideLink](https://gestalt.pinterest.systems/web/searchguidelink) appends and refines a search query. They appear under [SearchField](/web/searchfield) after user submits a search input.
 *
 * ![SearchGuideLink light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/SearchGuideLink.spec.ts-snapshots/SearchGuideLink-chromium-darwin.png)
 * ![SearchGuideLink dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/SearchGuideLink-dark.spec.ts-snapshots/SearchGuideLink-dark-chromium-darwin.png)
 *
 */

const SearchGuideLinkWithForwardRef = forwardRef<HTMLAnchorElement, Props>(function SearchGuide(
  {
    accessibilityLabel,
    color = '01',
    dataTestId,
    onClick,
    text,
    thumbnail,
    href,
    rel = 'none',
    target = null,
    tabIndex = 0,
  }: Props,
  ref,
) {
  const isInVRExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });

  const innerRef = useRef<null | HTMLAnchorElement>(null);

  // When using both forwardRef and innerRef, React.useimperativehandle() allows a parent component
  // that renders <SearchGuideLink ref={inputRef} /> to call inputRef.current.focus()
  // @ts-expect-error - TS2322 - Type 'HTMLButtonElement | null' is not assignable to type 'HTMLButtonElement'.
  useImperativeHandle(ref, () => innerRef.current);
  const childrenDivClasses = classnames(styles.childrenDiv);

  const textComponent = (
    <TextUI align="center" color="dark" overflow="noWrap">
      {text}
    </TextUI>
  );
  const thumbnailVariant = thumbnail && (
    <Flex alignItems="center" gap={{ row: 2, column: 0 }} justifyContent="center">
      {'avatar' in thumbnail && (
        <Box aria-hidden marginStart={isInVRExperiment ? 2 : undefined} minWidth={40}>
          {cloneElement(thumbnail.avatar, { size: 'fit' })}
        </Box>
      )}
      {'avatarGroup' in thumbnail && (
        <Box aria-hidden marginStart={isInVRExperiment ? 2 : undefined} minWidth={40}>
          {cloneElement(thumbnail.avatarGroup, { size: 'sm' })}
        </Box>
      )}
      {'image' in thumbnail && (
        <div className={isInVRExperiment ? styles.imageDivVr : styles.imageDiv}>
          {cloneElement(thumbnail.image, { fit: 'cover' })}
        </div>
      )}
      {'icon' in thumbnail && <Box marginStart={3}>{cloneElement(thumbnail.icon)}</Box>}
      <Box marginEnd={3}>{textComponent}</Box>
    </Flex>
  );
  const defaultVariant = (
    <Box paddingX={5}>
      <Flex alignItems="center" gap={{ row: 2, column: 0 }} justifyContent="center">
        {textComponent}
      </Flex>
    </Box>
  );

  const handleClick = ({
    event,
    dangerouslyDisableOnNavigation,
  }: {
    dangerouslyDisableOnNavigation: () => void;
    event: React.KeyboardEvent<HTMLAnchorElement> | React.MouseEvent<HTMLAnchorElement>;
  }) =>
    onClick
      ? onClick({
          event,
          dangerouslyDisableOnNavigation: dangerouslyDisableOnNavigation ?? (() => {}),
        })
      : undefined;

  return (
    <InternalLink
      ref={innerRef}
      aria-label={accessibilityLabel}
      colorClass={`color${color}`}
      dataTestId={dataTestId}
      href={href}
      onClick={handleClick}
      rel={rel}
      tabIndex={tabIndex}
      target={target}
      wrappedComponent="searchGuide"
    >
      <div className={childrenDivClasses}>{thumbnail ? thumbnailVariant : defaultVariant}</div>
    </InternalLink>
  );
});

SearchGuideLinkWithForwardRef.displayName = 'SearchGuideLink';

export default SearchGuideLinkWithForwardRef;
