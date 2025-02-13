import { ComponentProps, forwardRef, useImperativeHandle, useRef } from 'react';
import getAriaLabel from './accessibility/getAriaLabel';
import NewTabAccessibilityLabel from './accessibility/NewTabAccessibilityLabel';
import { useDefaultLabelContext } from './contexts/DefaultLabelProvider';
import Flex from './Flex';
import Icon from './Icon';
import icons from './icons/index';
import InternalLink from './Link/InternalLink';
import Text from './Text';
import TextUI from './TextUI';
import useInExperiment from './useInExperiment';

const SIZE_NAME_TO_PIXEL = {
  sm: 10,
  md: 12,
  lg: 12,
} as const;

type ButtonProps = {
  /**
   * Label to provide more context around ButtonLink’s function or purpose. See the [Accessibility guidelines](/foundations/accessibility) to learn more.,
   */
  accessibilityLabel?: string;
  /**
   * Available for testing purposes, if needed. Consider [better queries](https://testing-library.com/docs/queries/about/#priority) before using this prop.
   */
  dataTestId?: string;
  /**
   * Indicates if ButtonSocial is disabled. Disabled Buttons are inactive and cannot be interacted with.
   */
  disabled?: boolean;
  /**
   * An icon displayed after the text to help clarify the usage of ButtonSocial. See the [icon variant](#Icons) to learn more.
   */
  icon?: keyof typeof icons;
  /**
     * Callback invoked when the user clicks (press and release) on ButtonSocial with the mouse or keyboard.
       See [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider#Link-handlers) to learn more about link navigation.
     */
  onClick?: (arg1: {
    event: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>;
    dangerouslyDisableOnNavigation: () => void;
  }) => void;
  /**
   * sm: 32px, md: 40px, lg: 48px
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Text to render inside the ButtonSocial to convey the function and purpose of the ButtonSocial.
   */
  text: string;
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
 * [ButtonSocial](https://gestalt.pinterest.systems/buttonsocial) is mainly used to login/sign-up options.
 *
 * ![ButtonSocial light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/ButtonSocial.spec.ts-snapshots/ButtonSocial-chromium-darwin.png)
 * ![ButtonSocial dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/ButtonSocial-dark.spec.ts-snapshots/ButtonSocial-dark-chromium-darwin.png)
 */

const ButtonSocialWithForwardRef = forwardRef<HTMLAnchorElement, ButtonProps>(function ButtonSocial(
  {
    accessibilityLabel,
    dataTestId,
    disabled = false,
    onClick,
    size = 'md',
    icon='visit',
    text,
    href,
    rel = 'none',
    target = null,
  }: ButtonProps,
  ref,
) {
  const textSizesVR: {
    [key: string]: 'xs' | 'sm' | 'md';
  } = {
    sm: 'xs',
    md: 'sm',
    lg: 'md',
  };

  const innerRef = useRef<null | HTMLAnchorElement>(null);

  // When using both forwardRef and innerRef, React.useimperativehandle() allows a parent component
  // that renders <ButtonSocial ref={inputRef} /> to call inputRef.current.focus()
  // @ts-expect-error - TS2322 - Type 'HTMLAnchorElement | null' is not assignable to type 'HTMLAnchorElement'.
  useImperativeHandle(ref, () => innerRef.current);

  const isInVRExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualrefresh',
    mwebExperimentName: 'web_gestalt_visualrefresh',
  });

  const { accessibilityNewTabLabel } = useDefaultLabelContext('Link');

  const textColor = 'default'

  const ariaLabel = getAriaLabel({
    target,
    accessibilityLabel,
    accessibilityNewTabLabel,
  });

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

  const handleOnMouseEnter: ComponentProps<typeof InternalLink>['onMouseEnter'] = ({ event }) => {
    // @ts-expect-error - TS2322 - Type 'MouseEvent<HTMLAnchorElement, MouseEvent> | MouseEvent<HTMLDivElement, MouseEvent>' is not assignable to type 'MouseEvent<HTMLAnchorElement, MouseEvent>'.
    _onMouseEnter?.({ event });
  };
  const handleOnMouseLeave: ComponentProps<typeof InternalLink>['onMouseLeave'] = ({ event }) =>
    // @ts-expect-error - TS2322 - Type 'MouseEvent<HTMLAnchorElement, MouseEvent> | MouseEvent<HTMLDivElement, MouseEvent>' is not assignable to type 'MouseEvent<HTMLAnchorElement, MouseEvent>'.
    _onMouseLeave?.({ event });

  return (
    <InternalLink
      ref={innerRef}
      accessibilityLabel={ariaLabel}
      dataTestId={dataTestId}
      disabled={disabled}
      href={href}
      onClick={handleClick}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      rel={rel}
      selected={false}
      size={size}
      tabIndex={disabled ? -1 : 0}
      target={target}
      wrappedComponent="button"
    >
      <Flex alignItems="center" gap={{ row: 2, column: 0 }} justifyContent="center">
          <Icon
            accessibilityLabel=""
            color={textColor}
            icon={icon}
            size={SIZE_NAME_TO_PIXEL[size]}
          />
        {isInVRExperiment ? (
          <TextUI align="center" color={textColor} overflow="normal" size={textSizesVR[size]}>
            {text}
          </TextUI>
        ) : (
          <Text
            align="center"
            color={textColor}
            overflow="normal"
            size={size === 'sm' ? '200' : '300'}
            weight="bold"
          >
            {text}
          </Text>
        )}
      </Flex>
      <NewTabAccessibilityLabel target={target} />
    </InternalLink>
  );
});

ButtonSocialWithForwardRef.displayName = 'ButtonSocial';

export default ButtonSocialWithForwardRef;
