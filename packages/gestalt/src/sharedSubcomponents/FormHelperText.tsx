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
  noPadding,
}: Props) {
  const isInVRExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });

  return (
    // id is required for all helper texts accompanying an individual form element, not for groups of form elements such as RadioGroup.

    <div
      className={classnames({
        // none
        [styles.noStartPadding]: !isInVRExperiment && noPadding,
        // sm
        [styles.sm_startPadding]: !isInVRExperiment && size === 'sm' && !noPadding,
        [styles.sm_topPadding]: !isInVRExperiment && size === 'sm' && !noPadding,
        [styles.vr_sm_startPadding]: isInVRExperiment && size === 'sm' && !noPadding,
        [styles.vr_sm_topPadding]: isInVRExperiment && size === 'sm' && !noPadding,
        // md
        [styles.md_startPadding]: !isInVRExperiment && size === 'md' && !noPadding,
        [styles.md_topPadding]: !isInVRExperiment && size === 'md' && !noPadding,
        [styles.vr_md_startPadding]: isInVRExperiment && size === 'md' && !noPadding,
        [styles.vr_md_topPadding]: isInVRExperiment && size === 'md' && !noPadding,
        // lg
        [styles.lg_startPadding]: !isInVRExperiment && size === 'lg' && !noPadding,
        [styles.lg_topPadding]: !isInVRExperiment && size === 'lg' && !noPadding,
        [styles.vr_lg_startPadding]: isInVRExperiment && size === 'lg' && !noPadding,
        [styles.vr_lg_topPadding]: isInVRExperiment && size === 'lg' && !noPadding,
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
