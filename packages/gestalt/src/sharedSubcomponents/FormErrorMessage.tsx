import { ReactNode } from 'react';
import classnames from 'classnames';
import styles from './FormErrorMessage.css';
import helperTextStyles from './FormHelperText.css';
import Box from '../Box';
import Flex from '../Flex';
import Icon from '../Icon';
import Text from '../Text';
import useInExperiment from '../useInExperiment';

type SizeType = 'sm' | 'md' | 'lg';

type Props = {
  id: string;
  text?: ReactNode;
  size?: SizeType;
  noPadding?: boolean;
};

export default function FormErrorMessage({
  id,
  size,
  text = '',
  noPadding: noStartPadding,
}: Props) {
  const isInVRExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });

  return (
    <div
      className={classnames({
        // none
        [helperTextStyles.noStartPadding]: noStartPadding,
        // sm
        [helperTextStyles.sm_startPadding]: !isInVRExperiment && size === 'sm' && !noStartPadding,
        [helperTextStyles.sm_topPadding]: !isInVRExperiment && size === 'sm',
        [helperTextStyles.vr_sm_startPadding]: isInVRExperiment && size === 'sm' && !noStartPadding,
        [helperTextStyles.vr_sm_topPadding]: isInVRExperiment && size === 'sm',
        // md
        [helperTextStyles.md_startPadding]: !isInVRExperiment && size === 'md' && !noStartPadding,
        [helperTextStyles.md_topPadding]: !isInVRExperiment && size === 'md',
        [helperTextStyles.vr_md_startPadding]: isInVRExperiment && size === 'md' && !noStartPadding,
        [helperTextStyles.vr_md_topPadding]: isInVRExperiment && size === 'md',
        // lg
        [helperTextStyles.lg_startPadding]: !isInVRExperiment && size === 'lg' && !noStartPadding,
        [helperTextStyles.lg_topPadding]: !isInVRExperiment && size === 'lg',
        [helperTextStyles.vr_lg_startPadding]: isInVRExperiment && size === 'lg' && !noStartPadding,
        [helperTextStyles.vr_lg_topPadding]: isInVRExperiment && size === 'lg',
      })}
      id={id}
    >
      <Text color="error" size="100">
        {/* Class used to ensure all children are font size "sm" */}
        <span className={styles.formErrorMessage} id={id}>
          {/* This error message is accessible by screenreaders. It alerts the user right when the error message is presented to the user. While error messages are visually apparent to users who can see the page, they may not be obvious to users of assistive technologies. This role="alert" provides a way to programmatically expose dynamic content changes in a way that can be announced by assistive technologies.
           */}
          <Box role="alert">
            <Flex
              alignItems={isInVRExperiment ? 'start' : 'center'}
              gap={size === 'sm' || isInVRExperiment ? 1 : 2}
            >
              <Box
                dangerouslySetInlineStyle={{
                  __style: isInVRExperiment ? { marginTop: '2px' } : {},
                }}
              >
                <Icon
                  accessibilityLabel=""
                  color="error"
                  icon="workflow-status-problem"
                  size={isInVRExperiment || size === 'sm' ? 12 : 16}
                />
              </Box>
              {text}
            </Flex>
          </Box>
        </span>
      </Text>
    </div>
  );
}
