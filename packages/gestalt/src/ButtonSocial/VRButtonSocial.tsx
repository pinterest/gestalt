import { forwardRef, useImperativeHandle, useRef } from 'react';
import classnames from 'classnames';
import FacebookIcon from './FacebookIcon';
import GoogleIcon from './GoogleIcon';
import LineIcon from './LineIcon';
import styles from './VRButtonSocial.css';
import Box from '../Box';
import { useColorScheme } from '../contexts/ColorSchemeProvider';
import { useDefaultLabelContext } from '../contexts/DefaultLabelProvider';
import Flex from '../Flex';
import focusStyles from '../Focus.css';
import Icon from '../Icon';
import TextUI from '../TextUI';
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
  service: 'apple' | 'facebook' | 'google' | 'email' | 'line';
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
      iconService = <FacebookIcon />;
      break;
    case 'google':
      iconService = <GoogleIcon />;
      break;
    case 'email':
      iconService = <Icon accessibilityLabel="" color="default" icon="gmail" size={20} />;
      break;
    case 'line':
      iconService = <LineIcon />;
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
    textLoginLine,
    textContinueEmail,
    textContinueFacebook,
    textContinueGoogle,
    textContinueApple,
    textContinueLine,
    textSignupEmail,
    textSignupFacebook,
    textSignupGoogle,
    textSignupApple,
    textSignupLine,
  } = useDefaultLabelContext('ButtonSocial');

  const message = {
    apple: {
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
    line: {
      signup: textSignupLine,
      continue: textContinueLine,
      login: textLoginLine,
    },
  };

  const textWithService = message[service][type];

  const { colorSchemeName } = useColorScheme();

  const isDarkMode = colorSchemeName === 'darkMode';

  const background = isDarkMode ? styles.darkMode : styles.lightMode;

  const buttonClasses = classnames(styles.social, background, styles.rtl, {
    [focusStyles.accessibilityOutlineButtonSocialVR]: isFocusVisible,
  });

  return (
    <button
      className={buttonClasses}
      data-test-id={dataTestId}
      onClick={(event) => onClick?.({ event })}
      type="button"
    >
      <Flex alignItems="center" justifyContent="center">
        {iconService}
        <Box
          dangerouslySetInlineStyle={{
            __style: {
              position: 'absolute',
              left: '50%',
              transform: ' translate(-50%, 0%)',
            },
          }}
        >
          <TextUI align="center" color="default" size="md">
            {textWithService}
          </TextUI>
        </Box>
      </Flex>
    </button>
  );
});

ButtonSocialWithForwardRef.displayName = 'ButtonSocial';

export default ButtonSocialWithForwardRef;
