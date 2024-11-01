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
  const isSm = size === 'sm';
  const isMd = size === 'md';
  const isLg = size === 'lg';

  return (
    // id is required for all helper texts accompanying an individual form element, not for groups of form elements such as RadioGroup.

    <div
      className={classnames({
        // sm
        [styles.vr_sm_startPadding]: isSm && !noStartPadding,
        [styles.vr_sm_topPadding]: isSm,
        // md
        [styles.vr_md_startPadding]: isMd && !noStartPadding,
        [styles.vr_md_topPadding]: isMd,
        // lg
        [styles.vr_lg_startPadding]: isLg && !noStartPadding,
        [styles.vr_lg_topPadding]: isLg,
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
