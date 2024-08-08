import { ReactNode } from 'react';
import classnames from 'classnames';
import { Box, Flex, Icon, Text } from 'gestalt';
import styles from './HelperText.css';

type SizeType = 'sm' | 'md' | 'lg';

type Props = {
  id: string;
  text?: ReactNode;
  size?: SizeType;
  noPadding?: boolean;
};

const icon = 'workflow-status-problem';
const color = 'error';

export default function FormErrorMessage({
  id,
  size,
  text = '',
  noPadding: noStartPadding,
}: Props) {
  return (
    <div
      className={classnames({
        // none
        [styles.noStartPadding]: noStartPadding,
        // sm
        [styles.vr_sm_startPadding]: size === 'sm' && !noStartPadding,
        [styles.vr_sm_topPadding]: size === 'sm',
        // md
        [styles.vr_md_startPadding]: size === 'md' && !noStartPadding,
        [styles.vr_md_topPadding]: size === 'md',
        // lg
        [styles.vr_lg_startPadding]: size === 'lg' && !noStartPadding,
        [styles.vr_lg_topPadding]: size === 'lg',
      })}
      id={id}
    >
      <Text color="error" size="100">
        {/* Class used to ensure all children are font size "sm" */}
        <span className={styles.formErrorMessage} id={id}>
          {/* This error message is accessible by screenreaders. It alerts the user right when the error message is presented to the user. While error messages are visually apparent to users who can see the page, they may not be obvious to users of assistive technologies. This role="alert" provides a way to programmatically expose dynamic content changes in a way that can be announced by assistive technologies.
           */}
          <Box role="alert">
            <Flex alignItems="start" gap={1}>
              <Box
                dangerouslySetInlineStyle={{
                  __style: { marginTop: '2px' },
                }}
              >
                <Icon accessibilityLabel="" color={color} icon={icon} size={12} />
              </Box>
              {text}
            </Flex>
          </Box>
        </span>
      </Text>
    </div>
  );
}
