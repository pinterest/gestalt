import { forwardRef, useImperativeHandle, useRef } from 'react';
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
      iconService = (
        <svg
          fill="none"
          height="20"
          viewBox="0 0 20 20"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="10" cy="10" fill="white" r="10" />
          <path
            d="M20 10.0016C20 4.47792 15.5228 0 10 0C4.4772 0 0 4.47792 0 10.0016C0 14.692 3.2288 18.6278 7.5844 19.7088V13.0581H5.5224V10.0016H7.5844V8.68459C7.5844 5.28045 9.1248 3.70259 12.4664 3.70259C13.1 3.70259 14.1932 3.82701 14.6404 3.95103V6.72148C14.4044 6.69667 13.9944 6.68427 13.4852 6.68427C11.8456 6.68427 11.212 7.30557 11.212 8.92063V10.0016H14.4784L13.9172 13.0581H11.212V19.93C16.1628 19.3319 20 15.1152 20 10.0016Z"
            fill="#0866FF"
          />
        </svg>
      );
      break;
    case 3:
      iconService = (
        <svg
          fill="none"
          height="20"
          viewBox="0 0 110 110"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask height="110" id="mask0_99_4234" maskUnits="userSpaceOnUse" width="110" x="0" y="0">
            <path d="M110 0H0V110H110V0Z" fill="white" />
          </mask>
          <g mask="url(#mask0_99_4234)">
            <path
              d="M107.8 56.25C107.8 52.35 107.45 48.6001 106.8 44.9998H55V66.2748H84.5999C83.325 73.1498 79.4503 78.9749 73.6252 82.8749V96.675H91.4001C101.8 87.1 107.8 72.9997 107.8 56.25Z"
              fill="#4285F4"
            />
            <path
              d="M54.9998 110C69.8498 110 82.2996 105.075 91.3994 96.6753L73.6245 82.8753C68.6998 86.1753 62.3995 88.125 54.9998 88.125C40.6745 88.125 28.5498 78.45 24.2246 65.4502H5.84961V79.7001C14.8999 97.6752 33.4998 110 54.9998 110Z"
              fill="#34A853"
            />
            <path
              d="M24.2248 65.4502C23.1248 62.1502 22.5 58.6253 22.5 55.0002C22.5 51.3752 23.1248 47.8502 24.2248 44.5502V30.3003H5.8498C2.1252 37.7253 0 46.1254 0 55.0002C0 63.875 2.1252 72.2752 5.8498 79.7002L24.2248 65.4502Z"
              fill="#FBBC04"
            />
            <path
              d="M54.9998 21.8751C63.0744 21.8751 70.3245 24.6499 76.0247 30.0999L91.7998 14.3247C82.2749 5.44995 69.8245 0 54.9998 0C33.4998 0 14.8999 12.325 5.84961 30.3L24.2246 44.55C28.5498 31.5502 40.6745 21.8751 54.9998 21.8751Z"
              fill="#E94235"
            />
          </g>
        </svg>
      );
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

  const textWithService = `${TEXT_OPTIONS[text]} ${SERVICES_OPTIONS[service]}`;

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
