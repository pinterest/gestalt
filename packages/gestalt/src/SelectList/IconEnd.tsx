import classnames from 'classnames';
import styles from './VRSelectList.css';
import Box from '../Box';
import Icon from '../Icon';

type Props = {
  size?: 'md' | 'lg';
  disabled?: boolean;
};

export default function IconEnd({ disabled, size }: Props) {
  const isMD = size === 'md';
  const isLG = size === 'lg';

  return (
    <div
      className={classnames(styles.endIconContainer, {
        [styles.md_endIconContainer]: isMD,
        [styles.lg_endIconContainer]: isLG,
      })}
    >
      <Box
        alignItems="center"
        aria-hidden
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
