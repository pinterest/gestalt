// @flow strict
import {
  Fragment,
  forwardRef,
  useImperativeHandle,
  useRef,
  type AbstractComponent,
  type Node,
  type Element,
} from 'react';
import classnames from 'classnames';
import { useOnLinkNavigation } from './contexts/OnLinkNavigation.js';
import touchableStyles from './Touchable.css';
import styles from './Link.css';
import useTapFeedback, { keyPressShouldTriggerTap } from './useTapFeedback.js';
import getRoundingClassName, { type Rounding } from './getRoundingClassName.js';
import { type AbstractEventHandler } from './AbstractEventHandler.js';
import focusStyles from './Focus.css';
import useFocusVisible from './useFocusVisible.js';
import layoutStyles from './Layout.css';
import Icon from './Icon.js';
import Box from './Box.js';

type Props = {|
  /**
   * Supply a short, descriptive label for screen-readers to replace link texts that don't provide sufficient context about the link component behavior. Texts like Click Here, or Read More can be confusing when a screen reader reads them out of context. In those cases, we must pass an alternative text to replace the link text.
   * Accessibility: It populates aria-label. Screen readers read the accessibilityLabel prop, if present, instead of the link text.
   *
   * See the [Accessibility content](https://gestalt.pinterest.systems/link#accessibility) for details on proper usage.
   */
  accessibilityLabel?: string,
  /**
   * Use accessibilitySelected and role when using it as a Tab
   * See the [Accessible Tab Link](https://gestalt.pinterest.systems/link#tab) for details on proper usage.
   */
  accessibilitySelected?: boolean,
  children?: Node,
  hoverStyle?: 'none' | 'underline',
  href: string,
  /**
   * Id attribute of the anchor tag.
   */
  id?: string,
  inline?: boolean,
  /**
   * Label for screen readers to announce AvatarGroup.
   *
   * See the [new tab icon variant](https://gestalt.pinterest.systems/avatargroup#Accessibility) for details on proper usage.
   */
  newTabIcon?: null | 'visit' | 'arrow-up-right',
  /**
   * Label for screen readers to announce AvatarGroup.
   *
   * See the [new tab icon variant](https://gestalt.pinterest.systems/avatargroup#Accessibility) for details on proper usage.
   */
  newTabIconSize?: 'sm' | 'md' | 'lg',
  onBlur?: AbstractEventHandler<SyntheticFocusEvent<HTMLAnchorElement>>,
  /**
   * Callback fired when Link is clicked (pressed and released) with a mouse or keyboard. See OnLinkNavigationProvider to learn more about link navigation.
   */
  onClick?: AbstractEventHandler<
    SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement>,
    {| dangerouslyDisableOnNavigation: () => void |},
  >,
  onFocus?: AbstractEventHandler<SyntheticFocusEvent<HTMLAnchorElement>>,
  /**
   * Forward the ref to the underlying anchor element.
   */
  rel?: 'none' | 'nofollow',
  role?: 'tab',
  rounding?: Rounding,
  /**
   * See the [tapStyle and hoverStyle variant](https://gestalt.pinterest.systems/avatargroup#Accessibility) for details on proper usage.
   */
  tapStyle?: 'none' | 'compress',
  target?: null | 'self' | 'blank',
  // private props to be internally used, therefore, not documented
  disabled?: boolean,
|};

const NEW_TAB_ICON_SIZE_MAP = {
  sm: '12px',
  md: '14px',
  lg: '16px',
};
const NEW_TAB_ICON_MARGINSTART_MAP = {
  sm: 1,
  md: 2,
  lg: 2,
};
/**
 * [Link](https://gestalt.pinterest.systems/link) allows you to show links on the page, change the color, and take people to another place. Link is mainly used as navigational content and usually appear within or directly following a paragraph or sentence.
 */
const LinkWithForwardRef: AbstractComponent<Props, HTMLAnchorElement> = forwardRef<
  Props,
  HTMLAnchorElement,
>(function Link(
  {
    accessibilityLabel,
    accessibilitySelected,
    children,
    href,
    id,
    inline = false,
    newTabIcon = null,
    newTabIconSize = 'lg',
    onBlur,
    onClick,
    onFocus,
    rel = 'none',
    role,
    rounding = 0,
    hoverStyle = 'underline',
    tapStyle = 'none',
    target = null,
    disabled,
  }: Props,
  ref,
): Element<typeof Fragment> {
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

  const className = classnames(
    styles.link,
    focusStyles.hideOutline,
    touchableStyles.tapTransition,
    getRoundingClassName(rounding),
    {
      [layoutStyles.inlineBlock]: inline,
      [layoutStyles.block]: !inline,
      [styles.hoverUnderline]: hoverStyle === 'underline',
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
    <Fragment>
      <a
        aria-label={accessibilityLabel}
        aria-selected={accessibilitySelected}
        className={className}
        href={disabled ? undefined : href}
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
        role={role}
        target={target ? `_${target}` : null}
      >
        {children}
      </a>
      {newTabIcon ? (
        <Box
          aria-hidden
          display="inlineBlock"
          marginStart={NEW_TAB_ICON_MARGINSTART_MAP[newTabIconSize]}
        >
          <Icon
            icon={newTabIcon}
            size={NEW_TAB_ICON_SIZE_MAP[newTabIconSize]}
            accessibilityLabel=""
            color="darkGray"
            inline
          />
        </Box>
      ) : null}
    </Fragment>
  );
});

LinkWithForwardRef.displayName = 'Link';

export default LinkWithForwardRef;
