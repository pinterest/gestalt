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
  currentLength?: number;
  size?: SizeType;
};

export default function FormHelperText({ id, currentLength, text, maxLength, size }: Props) {
  const isInVRExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });

  return (
    // id is required for all helper texts accompanying an individual form element, not for groups of form elements such as RadioGroup.

    <div
      className={classnames({
        // sm
        [styles.sm_startPadding]: !isInVRExperiment && size === 'sm',
        [styles.sm_topPadding]: !isInVRExperiment && size === 'sm',
        [styles.vr_sm_startPadding]: isInVRExperiment && size === 'sm',
        [styles.vr_sm_topPadding]: isInVRExperiment && size === 'sm',
        // md
        [styles.md_startPadding]: !isInVRExperiment && size === 'md',
        [styles.md_topPadding]: !isInVRExperiment && size === 'md',
        [styles.vr_md_startPadding]: isInVRExperiment && size === 'md',
        [styles.vr_md_topPadding]: isInVRExperiment && size === 'md',
        // lg
        [styles.lg_startPadding]: !isInVRExperiment && size === 'lg',
        [styles.lg_topPadding]: !isInVRExperiment && size === 'lg',
        [styles.vr_lg_startPadding]: isInVRExperiment && size === 'lg',
        [styles.vr_lg_topPadding]: isInVRExperiment && size === 'lg',
      })}
      id={id}
    >
      <Flex gap={4}>
        <Flex.Item flex="grow">
          {text ? (
            <Text color="subtle" size="100">
              {text}
            </Text>
          ) : null}
        </Flex.Item>
        {maxLength ? (
          <FormHelperTextCounter currentLength={currentLength} maxLength={maxLength} />
        ) : null}
      </Flex>
    </div>
  );
}
