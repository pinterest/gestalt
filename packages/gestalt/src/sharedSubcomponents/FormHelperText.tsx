import classnames from 'classnames';
import styles from './FormHelperText.css';
import FormHelperTextCounter from './FormHelperTextCounter';
import Flex from '../Flex';
import Text from '../Text';
import { MaxLength } from '../TextField';
import useInExperiment from '../useInExperiment';

type SizeType = 'sm' | 'md' | 'lg';

type Props = {
  id?: string;
  text: string | null | undefined;
  maxLength?: MaxLength | null | undefined;
  noPadding?: boolean;
  currentLength?: number;
  size?: SizeType;
  disabled?: boolean;
};

export default function FormHelperText({
  disabled,
  id,
  currentLength,
  text,
  maxLength,
  size,
  noPadding: noStartPadding,
}: Props) {
  const isInVRExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualrefresh',
    mwebExperimentName: 'web_gestalt_visualrefresh',
  });

  return (
    // id is required for all helper texts accompanying an individual form element, not for groups of form elements such as RadioGroup.

    <div
      className={classnames({
        // none
        [styles.noStartPadding]: !isInVRExperiment && noStartPadding,
        // sm
        [styles.sm_startPadding]: !isInVRExperiment && size === 'sm' && !noStartPadding,
        [styles.sm_topPadding]: !isInVRExperiment && size === 'sm',
        [styles.vr_sm_startPadding]: isInVRExperiment && size === 'sm' && !noStartPadding,
        [styles.vr_sm_topPadding]: isInVRExperiment && size === 'sm',
        // md
        [styles.md_startPadding]: !isInVRExperiment && size === 'md' && !noStartPadding,
        [styles.md_topPadding]: !isInVRExperiment && size === 'md',
        [styles.vr_md_startPadding]: isInVRExperiment && size === 'md' && !noStartPadding,
        [styles.vr_md_topPadding]: isInVRExperiment && size === 'md',
        // lg
        [styles.lg_startPadding]: !isInVRExperiment && size === 'lg' && !noStartPadding,
        [styles.lg_topPadding]: !isInVRExperiment && size === 'lg',
        [styles.vr_lg_startPadding]: isInVRExperiment && size === 'lg' && !noStartPadding,
        [styles.vr_lg_topPadding]: isInVRExperiment && size === 'lg',
      })}
      id={id}
    >
      <Flex gap={4}>
        <Flex.Item flex="grow">
          {text ? (
            <Text color={disabled ? 'disabled' : 'subtle'} size="100">
              {text}
            </Text>
          ) : null}
        </Flex.Item>
        {maxLength ? (
          <FormHelperTextCounter
            currentLength={currentLength}
            disabled={disabled}
            maxLength={maxLength}
          />
        ) : null}
      </Flex>
    </div>
  );
}
