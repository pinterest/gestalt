import classnames from 'classnames';
import { Flex, Text } from 'gestalt';
import styles from './HelperText.css';

type SizeType = 'sm' | 'md' | 'lg';

type Props = {
  id?: string;
  text: string | null | undefined;
  noPadding?: boolean;
  size?: SizeType;
  disabled?: boolean;
};

export default function FormHelperText({
  disabled,
  id,
  text,
  size,
  noPadding: noStartPadding,
}: Props) {
  const isSM = size === 'sm';
  const isMD = size === 'md';
  const isLG = size === 'lg';

  return (
    // id is required for all helper texts accompanying an individual form element, not for groups of form elements such as RadioGroup.

    <div
      className={classnames({
        // sm
        [styles.vr_sm_startPadding]: isSM && !noStartPadding,
        [styles.vr_sm_topPadding]: isSM,
        // md
        [styles.vr_md_startPadding]: isMD && !noStartPadding,
        [styles.vr_md_topPadding]: isMD,
        // lg
        [styles.vr_lg_startPadding]: isLG && !noStartPadding,
        [styles.vr_lg_topPadding]: isLG,
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
      </Flex>
    </div>
  );
}
