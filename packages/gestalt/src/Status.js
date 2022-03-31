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
   * If not using `title`, provide an accessibility label to give the user context about the icon. Be sure to [localize](https://gestalt.pinterest.systems/status#Localization) the label.
   */
  accessibilityLabel?: string,
  /**
   * Additional contextual information around the status. Only for use with `title`. See [localization](https://gestalt.pinterest.systems/status#Localization) to learn more.
   */
  subtext?: string,
  /**
   * A label to reinforce the meaning of the status icon. See [localization](https://gestalt.pinterest.systems/status#Localization) to learn more.
   */
  title?: string,
  /**
   * The type of status to display.
   */
  type: StatusType,
|};

/**
 * [Status](https://gestalt.pinterest.systems/status) is a graphic indicator of an element’s state.
 *
 * ![Status light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/cypress/integration/visual-test/__image_snapshots__/Status%20%230.png)
 * ![Status dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/cypress/integration/visual-test/__image_snapshots__/Status-dark%20%230.png)
 *
 */
export default function Status({ accessibilityLabel, subtext, title, type }: Props): Node {
  const { icon, color } = ICON_COLOR_MAP[type];

  return (
    <Flex direction="column">
      <Flex alignItems="center" gap={2}>
        <Icon accessibilityLabel={accessibilityLabel ?? ''} color={color} icon={icon} size={16} />
        {title && <Text size="200">{title}</Text>}
      </Flex>

      {subtext && title && (
        <Box marginStart={6}>
          <Text color="gray" size="200">
            {subtext}
          </Text>
        </Box>
      )}
    </Flex>
  );
}
