import { forwardRef, useImperativeHandle, useRef } from 'react';
import classnames from 'classnames';
import Box from './Box';
import styles from './ButtonSocial.css';
import AppleIcon from './ButtonSocial/AppleIcon';
import FacebookIcon from './ButtonSocial/FacebookIcon';
import GoogleIcon from './ButtonSocial/GoogleIcon';
import LineIcon from './ButtonSocial/LineIcon';
import VRButtonSocial from './ButtonSocial/VRButtonSocial';
import { useColorScheme } from './contexts/ColorSchemeProvider';
import { useDefaultLabelContext } from './contexts/DefaultLabelProvider';
import Flex from './Flex';
import focusStyles from './Focus.css';
import Icon from './Icon';
import Text from './Text';
import useFocusVisible from './useFocusVisible';
import useExperimentalTheme from './utils/useExperimentalTheme';

type Props = {
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
 * [ButtonSocial](https://gestalt.pinterest.systems/buttonsocial) should be used only to enable users to sign-up or sign-in to Pinterest using other trusted services.
 *
 * ![ButtonSocial light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/ButtonSocial.spec.ts-snapshots/ButtonSocial-chromium-darwin.png)
 * ![ButtonSocial dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/ButtonSocial-dark.spec.ts-snapshots/ButtonSocial-dark-chromium-darwin.png)
 */

const ButtonSocialWithForwardRef = forwardRef<HTMLButtonElement, Props>(function ButtonSocial(
  { dataTestId, onClick, type, service }: Props,
  ref,
) {
  const innerRef = useRef<null | HTMLButtonElement>(null);

  // When using both forwardRef and innerRef, React.useimperativehandle() allows a parent component
  // that renders <Button ref={inputRef} /> to call inputRef.current.focus()
  // @ts-expect-error - TS2322 - Type 'HTMLButtonElement | null' is not assignable to type 'HTMLButtonElement'.
  useImperativeHandle(ref, () => innerRef.current);

  let iconService = null;

  switch (service) {
    case 'apple':
      iconService = <AppleIcon />;
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

  const theme = useExperimentalTheme();

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

  const { isFocusVisible } = useFocusVisible();

  if (theme.MAIN) {
    return (
      <VRButtonSocial dataTestId={dataTestId} onClick={onClick} service={service} type={type} />
    );
  }

  const isDarkMode = colorSchemeName === 'darkMode';

  const background = isDarkMode ? styles.darkMode : styles.lightMode;

  const buttonClasses = classnames(background, styles.social, styles.rtl, {
    [focusStyles.accessibilityOutlineButtonSocial]: isFocusVisible,
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
              width: '100%',
              transform: ' translate(-50%, 0%)',
            },
          }}
        >
          <Text align="center" color="default" size="300" weight="bold">
            {textWithService}
          </Text>
        </Box>
      </Flex>
    </button>
  );
});

ButtonSocialWithForwardRef.displayName = 'ButtonSocial';

export default ButtonSocialWithForwardRef;
