import classnames from 'classnames';
import styles from './VRSelectList.css';
import Box from '../Box';
import Icon from '../Icon';
import useInExperiment from '../useInExperiment';

type Props = {
  accessibilityHidden?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
};

export default function PasswordIconButton({ accessibilityHidden, size, disabled }: Props) {
  const isInVRExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });
  return (
    // styles.actionButtonContainer is required for RTL positioning
    <div
      className={classnames({
        [styles.actionButtonContainer]: !isInVRExperiment,
        [styles.vr_sm_actionButtonContainer]: isInVRExperiment && size === 'sm',
        [styles.vr_md_actionButtonContainer]: isInVRExperiment && size === 'md',
        [styles.vr_lg_actionButtonContainer]: isInVRExperiment && size === 'lg',
      })}
    >
      <Box
        alignItems={isInVRExperiment ? 'end' : 'center'}
        aria-hidden={accessibilityHidden}
        display="flex"
        height="100%"
        marginEnd={2}
        rounding="circle"
      >
        <Icon
          accessibilityLabel=""
          color={disabled ? 'subtle' : 'default'}
          icon="arrow-down"
          size={12}
        />
      </Box>
    </div>
  );
}
