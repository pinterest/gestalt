import { ReactElement } from 'react';
import cx from 'classnames';
import { useColorScheme } from '../contexts/ColorSchemeProvider';
import styles from '../Text.css';
import typographyStyle from '../Typography.css';

type Size = '100' | '200' | '300' | '400' | '500' | '600';

// If `text` is a Text component, we need to override any text colors within to ensure they all match
export default function OverridingSpan({
  textElement,
  isError,
  inverseTextColor,
  size = '300',
}: {
  textElement: ReactElement | string;
  isError?: boolean;
  inverseTextColor?: boolean;
  size?: Size;
}) {
  const { colorSchemeName } = useColorScheme();
  const isDarkMode = colorSchemeName === 'darkMode';

  let textColorOverrideStyles = isDarkMode
    ? styles.textColorOverrideLight
    : styles.textColorOverrideDark;

  if (inverseTextColor) {
    textColorOverrideStyles = isDarkMode
      ? styles.textColorOverrideDark
      : styles.textColorOverrideLight;
  }
  // Error type enforces bold weight
  if (isError) {
    textColorOverrideStyles = styles.textColorOverrideError;
  }

  return (
    <span className={cx(typographyStyle[`fontSize${size}Override`], textColorOverrideStyles)}>
      {textElement}
    </span>
  );
}
