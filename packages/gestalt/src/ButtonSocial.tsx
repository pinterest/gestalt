import {  forwardRef, useImperativeHandle, useRef } from 'react';
import getAriaLabel from './accessibility/getAriaLabel';
import NewTabAccessibilityLabel from './accessibility/NewTabAccessibilityLabel';
import Box from './Box';
import VRButtonSocial from './ButtonSocial/VRButtonSocial';
import { useDefaultLabelContext } from './contexts/DefaultLabelProvider';
import Flex from './Flex';
import Icon from './Icon';
import InternalLink from './Link/InternalLink';
import Text from './Text';
import useInExperiment from './useInExperiment';

const TEXT_OPTIONS = {
  1: 'Login with',
  2: 'Continue with',
  3: 'Sign up with',
};

const SERVICES_OPTIONS = {
  1: 'Apple',
  2: 'Facebook',
  3: 'Google',
  4: 'Email',
};

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
   * Indicates whether this component is hosted in a light or dark container.
   * Used for improving focus ring color contrast.
   */
  focusColor?: 'lightBackground' | 'darkBackground';
  /**
   * Default Buttons are sized by the text within the ButtonSocial whereas full-width Buttons expand to the full width of their container.
   */
  fullWidth?: boolean;
  /**
   * Use "-1" to remove ButtonSocial from keyboard navigation. See the [Accessibility guidelines](/foundations/accessibility) to learn more.
   */
  tabIndex?: -1 | 0;
  /**
     * Callback invoked when the user clicks (press and release) on ButtonSocial with the mouse or keyboard.
       See [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider#Link-handlers) to learn more about link navigation.
     */
  onClick?: (arg1: {
    event: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>;
    dangerouslyDisableOnNavigation: () => void;
  }) => void;
  /**
   * Text to render inside the ButtonSocial to convey the function and purpose of the ButtonSocial.
   */
  text: keyof typeof TEXT_OPTIONS;
  /**
   * Text to render inside the ButtonSocial to convey the function and purpose of the ButtonSocial.
   */
  service: keyof typeof SERVICES_OPTIONS;
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
 * [ButtonSocial](https://gestalt.pinterest.systems/buttonlink) should be used only to enable users to sign-up or sign-in to Pinterest using other trusted services.
 *
 * ![ButtonSocial light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/ButtonSocial.spec.ts-snapshots/ButtonSocial-chromium-darwin.png)
 * ![ButtonSocial dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/ButtonSocial-dark.spec.ts-snapshots/ButtonSocial-dark-chromium-darwin.png)
 */

const ButtonLinkWithForwardRef = forwardRef<HTMLAnchorElement, ButtonProps>(function ButtonSocial(
  {
    accessibilityLabel,
    dataTestId,
    focusColor,
    fullWidth = false,
    onClick,
    tabIndex = 0,
    text,
    service,
    href,
    rel = 'none',
    target = null,
  }: ButtonProps,
  ref,
) {
  const innerRef = useRef<null | HTMLAnchorElement>(null);

  // When using both forwardRef and innerRef, React.useimperativehandle() allows a parent component
  // that renders <ButtonSocial ref={inputRef} /> to call inputRef.current.focus()
  // @ts-expect-error - TS2322 - Type 'HTMLAnchorElement | null' is not assignable to type 'HTMLAnchorElement'.
  useImperativeHandle(ref, () => innerRef.current);
  const color = 'white';

  let iconService = null;

  switch (service) {
    case 1:
      iconService = <Icon accessibilityLabel="" color="default" icon="apple" size={20} />;
      break;
    case 2:
      iconService = <Icon accessibilityLabel="" color="default" icon="facebook-color" size={20} />;
      break;
    case 3:
      iconService = <Icon accessibilityLabel="" color="default" icon="google" size={20} />;
      break;
    case 4:
      iconService = <Icon accessibilityLabel="" color="default" icon="gmail" size={20} />;
      break;
    default:
      iconService = <Icon accessibilityLabel="" color="default" icon="gmail" size={20} />;
      break;
  }

  const isInVRExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualrefresh',
    mwebExperimentName: 'web_gestalt_visualrefresh',
  });

  const textWithService = TEXT_OPTIONS[text] + SERVICES_OPTIONS[service];

  const { 
    textLoginEmail,
    textLoginFacebook,
    textLoginGoogle,
    textLoginApple,
    textContinueEmail,
    textContinueFacebook,
    textContinueGoogle,
    textContinueApple,
    textSignupEmail,
    textSignupFacebook,
    textSignupGoogle,
    textSignupApple,
   } = useDefaultLabelContext('ButtonSocial');

   let textWithServiceTranslated = '';

   switch (textWithService) {
    case 'Login with Apple':
      textWithServiceTranslated = textLoginApple;
      break;
    case 'Login with Facebook':
      textWithServiceTranslated = textLoginFacebook;
      break;
    case 'Login with Google':
      textWithServiceTranslated = textLoginGoogle;
      break;
    case 'Login with Email':
      textWithServiceTranslated = textLoginEmail;
      break;
    case 'Continue with Apple':
      textWithServiceTranslated = textContinueApple;
      break;
    case 'Continue with Facebook':
      textWithServiceTranslated = textContinueFacebook;
      break;
    case 'Continue with Google':
      textWithServiceTranslated = textContinueGoogle;
      break;
    case 'Continue with Email':
      textWithServiceTranslated = textContinueEmail;
      break;
    case 'Sign up with Apple':
      textWithServiceTranslated = textSignupApple;
      break;
    case 'Sign up with Facebook':
      textWithServiceTranslated = textSignupFacebook;
      break;
    case 'Sign up with Google':
      textWithServiceTranslated = textSignupGoogle;
      break;
    case 'Sign up with Email':
      textWithServiceTranslated = textSignupEmail;
      break;
    default:
      textWithServiceTranslated = textSignupEmail;
      break;
   }

   const { accessibilityNewTabLabel } = useDefaultLabelContext('Link');

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

  if (isInVRExperiment) {
    return (
      <VRButtonSocial
        accessibilityLabel={accessibilityLabel}
        dataTestId={dataTestId}
        focusColor={focusColor}
        fullWidth={fullWidth}
        href={href}
        onClick={onClick}
        rel={rel}
        service={service}
        tabIndex={tabIndex}
        target={target}
        text={text}
      />
    );
  }

  return (
    <InternalLink
      ref={innerRef}
      accessibilityLabel={ariaLabel}
      colorClass={color}
      dataTestId={dataTestId}
      disabled={false}
      focusColor={focusColor}
      fullWidth={fullWidth}
      href={href}
      onClick={handleClick}
      rel={rel}
      selected={false}
      size="social"
      tabIndex={tabIndex}
      target={target}
      wrappedComponent="button"
    >
    <Box>
        <Flex alignItems="center" gap={{ row: 2, column: 0 }} justifyContent="center">
          <Box marginStart={4}>{iconService}</Box>
          <Box
            dangerouslySetInlineStyle={{
              __style: {
                position: 'absolute',
                left: '50%',
                transform: ' translate(-50%, -50%)',
              },
            }}
          >
            <Text align="center" color="default" size="300">
              {textWithServiceTranslated}
            </Text>
          </Box>
        </Flex>
      </Box>
      <NewTabAccessibilityLabel target={target} />
    </InternalLink>
  );
});

ButtonLinkWithForwardRef.displayName = 'ButtonSocial';

export default ButtonLinkWithForwardRef;
