import {ReactNode} from 'react';
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
} as const;

type Props = {
  accessibilityDismissButtonLabel: string,
  type: "default" | "warning" | "error",
  heading: string,
  onDismiss: () => void
};

export default function ModalAlertHeader(
  {
    accessibilityDismissButtonLabel,
    type,
    heading,
    onDismiss,
  }: Props,
) {
  return (
    <Flex alignItems="center" flex="grow" gap={4}>
      {type !== 'default' && (
        <Box>
          <Icon
            accessibilityLabel={type}
            color={ICON_COLOR_MAP[type].color}
            icon={ICON_COLOR_MAP[type].icon}
            size="20"
          />
        </Box>
      )}
      <Flex.Item flex="grow">
        <Heading accessibilityLevel={1} size="400">
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
