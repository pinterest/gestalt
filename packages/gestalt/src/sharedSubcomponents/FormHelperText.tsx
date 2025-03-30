import classnames from 'classnames';
import styles from './FormHelperText.css';
import FormHelperTextCounter from './FormHelperTextCounter';
import Flex from '../Flex';
import Text from '../Text';
import { MaxLength } from '../TextField';
import useExperimentalTheme from '../utils/useExperimentalTheme';

type SizeType = 'sm' | 'md' | 'lg';

type Props = {
  id?: string;
  text: string | null | undefined;
  maxLength?: MaxLength | null | undefined;
  noPadding?: boolean;
  currentLength?: number;
  size?: SizeType;
  disabled?: boolean;
  marginTop?: boolean;
};

export default function FormHelperText({
  disabled,
  id,
  currentLength,
  text,
  maxLength,
  size,
  noPadding: noStartPadding,
  marginTop,
}: Props) {
  const theme = useExperimentalTheme();

  return (
    // id is required for all helper texts accompanying an individual form element, not for groups of form elements such as RadioGroup.

    <div
      className={classnames({
        [styles.marginTop]: marginTop,
        // none
        [styles.noStartPadding]: !theme.MAIN && noStartPadding,
        // sm
        [styles.sm_startPadding]: !theme.MAIN && size === 'sm' && !noStartPadding,
        [styles.sm_topPadding]: !theme.MAIN && size === 'sm',
        [styles.vr_sm_startPadding]: theme.MAIN && size === 'sm' && !noStartPadding,
        [styles.vr_sm_topPadding]: theme.MAIN && size === 'sm',
        // md
        [styles.md_startPadding]: !theme.MAIN && size === 'md' && !noStartPadding,
        [styles.md_topPadding]: !theme.MAIN && size === 'md',
        [styles.vr_md_startPadding]: theme.MAIN && size === 'md' && !noStartPadding,
        [styles.vr_md_topPadding]: theme.MAIN && size === 'md',
        // lg
        [styles.lg_startPadding]: !theme.MAIN && size === 'lg' && !noStartPadding,
        [styles.lg_topPadding]: !theme.MAIN && size === 'lg',
        [styles.vr_lg_startPadding]: theme.MAIN && size === 'lg' && !noStartPadding,
        [styles.vr_lg_topPadding]: theme.MAIN && size === 'lg',
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
