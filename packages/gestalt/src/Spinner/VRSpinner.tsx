import classnames from 'classnames';
import styles from './VRSpinner.css';
import Box from '../Box';
import { useDefaultLabelContext } from '../contexts/DefaultLabelProvider';

const SIZE_NAME_TO_PIXEL = {
  sm: 32,
  md: 40,
  lg: 48,
} as const;

type Props = {
  accessibilityLabel?: string;
  delay?: boolean;
  show: boolean;
  size?: 'sm' | 'md' | 'lg';
};

export default function Spinner({ accessibilityLabel, delay = true, show, size = 'md' }: Props) {
  const { accessibilityLabel: accessibilityLabelDefault } = useDefaultLabelContext('Spinner');

  if (!show) return null;

  return (
    <Box display="flex" justifyContent="around">
      <div
        aria-label={accessibilityLabel ?? accessibilityLabelDefault}
        className={classnames(styles.spinner, { [styles.delay]: delay })}
        style={
          {
            '--g-size': `${SIZE_NAME_TO_PIXEL[size]}px`,
          } as React.CSSProperties
        }
      >
        <div className={styles.spinnerFrame}>
          <div className={styles.dot1} />
          <div className={styles.dot2} />
          <div className={styles.dot3} />
        </div>
      </div>
    </Box>
  );
}

Spinner.displayName = 'Spinner';
