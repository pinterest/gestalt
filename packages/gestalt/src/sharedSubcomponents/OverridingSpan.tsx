import { ReactElement } from 'react';
import cx from 'classnames';
import { useColorScheme } from '../contexts/ColorSchemeProvider';
import styles from '../Text.css';
import typography from '../Typography.css';
import useInExperiment from '../useInExperiment';

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
  const isInExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });

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
  if (isError && !isInExperiment) {
    textColorOverrideStyles = styles.textColorOverrideError;
  }

  return (
    <span className={cx(typography[`fontSize${size}Override`], textColorOverrideStyles)}>
      {textElement}
    </span>
  );
}
