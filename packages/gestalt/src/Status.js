// @flow strict
import { type Node } from 'react';
import Box from './Box.js';
import Icon from './Icon.js';
import Flex from './Flex.js';
import Text from './Text.js';

const ICON_COLOR_MAP = {
  canceled: {
    icon: 'workflow-status-canceled',
    color: 'gray',
  },
  halted: {
    icon: 'workflow-status-halted',
    color: 'darkGray',
  },
  inProgress: {
    icon: 'workflow-status-in-progress',
    color: 'green',
  },
  ok: {
    icon: 'workflow-status-ok',
    color: 'green',
  },
  problem: {
    icon: 'workflow-status-problem',
    color: 'red',
  },
  unstarted: {
    icon: 'workflow-status-unstarted',
    color: 'darkGray',
  },
  warning: {
    icon: 'workflow-status-warning',
    color: 'orange',
  },
};

type StatusType = 'unstarted' | 'inProgress' | 'halted' | 'ok' | 'problem' | 'canceled' | 'warning';

type Props = {|
  /**
   * Additional contextual information around the status. See [localization](https://gestalt.pinterest.systems/status#Localization)  to learn more.
   */
  subtext?: string,
  /**
   * A label to reinforce the meaning of the status icon. See [localization](https://gestalt.pinterest.systems/status#Localization)  to learn more.
   */
  title: string,
  /**
   * The type of status to display.
   */
  type: StatusType,
|};

/**
 * https://gestalt.pinterest.systems/Status
 */
export default function Status({ subtext, title, type }: Props): Node {
  const { icon, color } = ICON_COLOR_MAP[type];

  return (
    <Flex direction="column">
      <Flex alignItems="center" gap={2}>
        <Icon accessibilityLabel="" color={color} icon={icon} size={16} />
        <Text size="md">{title}</Text>
      </Flex>

      {subtext && (
        <Box marginStart={6}>
          <Text color="gray" size="md">
            {subtext}
          </Text>
        </Box>
      )}
    </Flex>
  );
}
