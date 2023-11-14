// @flow strict
import { type Node as ReactNode } from 'react';
import Box from '../Box';
import Flex from '../Flex';
import Heading from '../Heading';
import Icon from '../Icon';
import IconButton from '../IconButton';

const ICON_COLOR_MAP = {
  error: {
    icon: 'workflow-status-problem',
    color: 'error',
  },
  warning: {
    icon: 'workflow-status-warning',
    color: 'warning',
  },
};

type Props = {
  accessibilityDismissButtonLabel: string,
  type: 'default' | 'warning' | 'error',
  heading: string,
  onDismiss: () => void,
};

export default function ModalAlertHeader({
  accessibilityDismissButtonLabel,
  type,
  heading,
  onDismiss,
}: Props): ReactNode {
  return (
    <Flex flex="grow" alignItems="center" gap={4}>
      {type !== 'default' && (
        <Box>
          <Icon
            size="20"
            accessibilityLabel={type}
            icon={ICON_COLOR_MAP[type].icon}
            color={ICON_COLOR_MAP[type].color}
          />
        </Box>
      )}
      <Flex.Item flex="grow">
        <Heading size="400" accessibilityLevel={1}>
          {heading}
        </Heading>
      </Flex.Item>
      {type === 'default' && (
        <Box marginStart={2}>
          <IconButton
            accessibilityLabel={accessibilityDismissButtonLabel}
            bgColor="white"
            icon="cancel"
            iconColor="darkGray"
            onClick={onDismiss}
            size="sm"
          />
        </Box>
      )}
    </Flex>
  );
}
