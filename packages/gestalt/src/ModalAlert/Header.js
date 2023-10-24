// @flow strict
import { type Node } from 'react';
import Box from '../Box.js';
import Flex from '../Flex.js';
import Heading from '../Heading.js';
import Icon from '../Icon.js';
import IconButton from '../IconButton.js';

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
}: Props): Node {
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
