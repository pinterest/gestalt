import classnames from 'classnames';
import styles from '../BannerCallout.css';
import { useDefaultLabelContext } from '../contexts/DefaultLabelProvider';
import InternalIconCompactButton from '../IconButton/InternalIconCompactButton';

type Props = {
  size?: 'sm' | 'lg';
  dismissButton?: {
    accessibilityLabel?: string;
    onDismiss: () => void;
  };
};

export default function DismissButton({ dismissButton, size = 'lg' }: Props) {
  const { accessibilityDismissButtonLabel } = useDefaultLabelContext('BannerCallout');

  return (
    <div
      className={classnames(
        styles.dismissButton,
        size === 'lg' ? styles.lgRtlVRPos : styles.smRtlVRPos,
      )}
    >
      <InternalIconCompactButton
        accessibilityLabel={dismissButton?.accessibilityLabel ?? accessibilityDismissButtonLabel}
        icon="compact-cancel"
        iconColor="darkGray"
        onClick={dismissButton?.onDismiss}
        size="sm"
      />
    </div>
  );
}
