import classnames from 'classnames';
import styles from './VRSpinner.css';
import { useDefaultLabelContext } from '../contexts/DefaultLabelProvider';

type Props = {
  accessibilityLabel?: string;
  delay?: boolean;
  show: boolean;
  size?: 'sm' | 'md' | 'lg';
};

export default function Spinner({ accessibilityLabel, delay = true, show, size = 'md' }: Props) {
  const { accessibilityLabel: accessibilityLabelDefault } = useDefaultLabelContext('Spinner');

  if (!show) return <div />;

  return (
    <div
      aria-label={accessibilityLabel ?? accessibilityLabelDefault}
      className={classnames(styles.spinner, styles[size], { [styles.delay]: delay })}
    >
      <div className={styles.spinnerFrame}>
        <div className={styles.dot1} />
        <div className={styles.dot2} />
        <div className={styles.dot3} />
      </div>
    </div>
  );
}

Spinner.displayName = 'Spinner';
