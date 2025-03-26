import { forwardRef, useImperativeHandle, useRef } from 'react';
import classnames from 'classnames';
import styles from './VRButtonSocial.css';
import Box from '../Box';
import { useColorScheme } from '../contexts/ColorSchemeProvider';
import { useDefaultLabelContext } from '../contexts/DefaultLabelProvider';
import Flex from '../Flex';
import focusStyles from '../Focus.css';
import Icon from '../Icon';
import Text from '../Text';
import useFocusVisible from '../useFocusVisible';

type ButtonProps = {
  /**
   * Available for testing purposes, if needed. Consider [better queries](https://testing-library.com/docs/queries/about/#priority) before using this prop.
   */
  dataTestId?: string;
  /**
   * Callback invoked when the user clicks (press and release) on Button with the mouse or keyboard.
   */
  onClick?: (arg1: {
    event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>;
  }) => void;
  /**
   * Text to render inside the ButtonSocial to convey the function and purpose of the ButtonSocial.
   */
  type: 'login' | 'continue' | 'signup';
  /**
   * Text to render inside the ButtonSocial to convey the function and purpose of the ButtonSocial.
   */
  service: 'apple' | 'facebook' | 'google' | 'email';
};

/**
 * [ButtonLink](https://gestalt.pinterest.systems/buttonlink) should be used only to enable users to sign-up or sign-in to Pinterest using other trusted services.
 *
 * ![ButtonLink light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/ButtonLink.spec.ts-snapshots/ButtonLink-chromium-darwin.png)
 * ![ButtonLink dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/ButtonLink-dark.spec.ts-snapshots/ButtonLink-dark-chromium-darwin.png)
 */

const ButtonSocialWithForwardRef = forwardRef<HTMLButtonElement, ButtonProps>(function ButtonLink(
  { dataTestId, onClick, type, service },
  ref,
) {
  const innerRef = useRef<null | HTMLButtonElement>(null);

  const { isFocusVisible } = useFocusVisible();

  // When using both forwardRef and innerRef, React.useimperativehandle() allows a parent component
  // that renders <ButtonLink ref={inputRef} /> to call inputRef.current.focus()
  // @ts-expect-error - TS2322 - Type 'HTMLButtonElement | null' is not assignable to type 'HTMLButtonElement'.
  useImperativeHandle(ref, () => innerRef.current);

  let iconService = null;

  switch (service) {
    case 'apple':
      iconService = <Icon accessibilityLabel="" color="default" icon="apple" size={20} />;
      break;
    case 'facebook':
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
    case 'google':
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
    case 'email':
      iconService = <Icon accessibilityLabel="" color="default" icon="gmail" size={20} />;
      break;
    default:
      iconService = <Icon accessibilityLabel="" color="default" icon="gmail" size={20} />;
      break;
  }

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


  const message = { 
    apple: 
    {
      signup: textSignupApple, 
      continue: textContinueApple, 
      login: textLoginApple, 
    },
    facebook: {
      signup: textSignupFacebook, 
      continue: textContinueFacebook, 
      login: textLoginFacebook, 
    },
    google: {
      signup: textSignupGoogle, 
      continue: textContinueGoogle, 
      login: textLoginGoogle, 
    },
    email: {
      signup: textSignupEmail, 
      continue: textContinueEmail, 
      login: textLoginEmail,
    },
  }

  const textWithService = message[service][type]


  const { colorSchemeName } = useColorScheme();

  const isDarkMode = colorSchemeName === 'darkMode';

  const background = isDarkMode ? styles.darkMode : styles.lightMode;

  const buttonClasses = classnames(styles.social, background, {
    [focusStyles.accessibilityOutlineButtonSocial]: isFocusVisible,
  });

  return (
    <button
      className={buttonClasses}
      data-test-id={dataTestId}
      onClick={(event) => onClick?.({ event })}
      type="button"
    >
        <Flex alignItems="center" gap={{ row: 2, column: 0 }} justifyContent="center">
          {iconService}
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
              {textWithService}
            </Text>
          </Box>
        </Flex>
    </button>
  );
});

ButtonSocialWithForwardRef.displayName = 'ButtonSocial';

export default ButtonSocialWithForwardRef;
