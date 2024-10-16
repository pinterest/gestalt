import classnames from 'classnames';
import styles from '../BannerCallout.css';
import { useDefaultLabelContext } from '../contexts/DefaultLabelProvider';
import IconButton from '../IconButton';

type Props = {
  dismissButton?: {
    accessibilityLabel?: string;
    onDismiss: () => void;
  };
};

export default function DismissButton({ dismissButton }: Props) {
  const { accessibilityDismissButtonLabel } = useDefaultLabelContext('BannerCallout');

  return (
    <div className={classnames(styles.dismissButton, styles.rtlVRPos)}>
      <IconButton
        accessibilityLabel={dismissButton?.accessibilityLabel ?? accessibilityDismissButtonLabel}
        icon="cancel"
        iconColor="darkGray"
        onClick={dismissButton?.onDismiss}
        size="sm"
      />
    </div>
  );
}
