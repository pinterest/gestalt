import { ReactNode } from 'react';
import classnames from 'classnames';
import styles from './FormErrorMessage.css';
import helperTextStyles from './FormHelperText.css';
import Box from '../Box';
import Flex from '../Flex';
import IconCompact from '../IconCompact';
import Text from '../Text';
import useExperimentalTheme from '../utils/useExperimentalTheme';

type SizeType = 'sm' | 'md' | 'lg';

type Props = {
  id: string;
  text?: ReactNode;
  size?: SizeType;
  noPadding?: boolean;
  marginTop?: boolean;
};

export default function FormErrorMessage({
  id,
  size,
  text = '',
  noPadding: noStartPadding,
  marginTop,
}: Props) {
  const theme = useExperimentalTheme();

  return (
    <div
      className={classnames({
        [helperTextStyles.marginTop]: marginTop,
        // none
        [helperTextStyles.noStartPadding]: noStartPadding,
        // sm
        [helperTextStyles.sm_startPadding]: !theme.MAIN && size === 'sm' && !noStartPadding,
        [helperTextStyles.sm_topPadding]: !theme.MAIN && size === 'sm',
        [helperTextStyles.vr_sm_startPadding]: theme.MAIN && size === 'sm' && !noStartPadding,
        [helperTextStyles.vr_sm_topPadding]: theme.MAIN && size === 'sm',
        // md
        [helperTextStyles.md_startPadding]: !theme.MAIN && size === 'md' && !noStartPadding,
        [helperTextStyles.md_topPadding]: !theme.MAIN && size === 'md',
        [helperTextStyles.vr_md_startPadding]: theme.MAIN && size === 'md' && !noStartPadding,
        [helperTextStyles.vr_md_topPadding]: theme.MAIN && size === 'md',
        // lg
        [helperTextStyles.lg_startPadding]: !theme.MAIN && size === 'lg' && !noStartPadding,
        [helperTextStyles.lg_topPadding]: !theme.MAIN && size === 'lg',
        [helperTextStyles.vr_lg_startPadding]: theme.MAIN && size === 'lg' && !noStartPadding,
        [helperTextStyles.vr_lg_topPadding]: theme.MAIN && size === 'lg',
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
              alignItems={theme.MAIN ? 'start' : 'center'}
              gap={size === 'sm' || theme.MAIN ? 1 : 2}
            >
              <Box
                dangerouslySetInlineStyle={{
                  __style: theme.MAIN ? { marginTop: '2px' } : {},
                }}
              >
                <IconCompact
                  accessibilityLabel=""
                  color="error"
                  icon="compact-workflow-status-problem"
                  size={theme.MAIN || size === 'sm' ? 12 : 16}
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
