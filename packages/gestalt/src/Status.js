// @flow strict
import { type Node } from 'react';
import Box from './Box.js';
import Flex from './Flex.js';
import Icon from './Icon.js';
import Text from './Text.js';

const ICON_COLOR_MAP = {
  canceled: {
    icon: 'workflow-status-canceled',
    color: 'subtle',
  },
  halted: {
    icon: 'workflow-status-halted',
    color: 'default',
  },
  inProgress: {
    icon: 'workflow-status-in-progress',
    color: 'success',
  },
  ok: {
    icon: 'workflow-status-ok',
    color: 'success',
  },
  problem: {
    icon: 'workflow-status-problem',
    color: 'error',
  },
  unstarted: {
    icon: 'workflow-status-unstarted',
    color: 'default',
  },
  queued: {
    icon: 'workflow-status-queued',
    color: 'default',
  },
  warning: {
    icon: 'workflow-status-warning',
    color: 'warning',
  },
};

type StatusType =
  | 'unstarted'
  | 'queued'
  | 'inProgress'
  | 'halted'
  | 'ok'
  | 'problem'
  | 'canceled'
  | 'warning';

type Props = {
  /**
   * If not using `title`, provide an accessibility label to give the user context about the icon. Be sure to [localize](https://gestalt.pinterest.systems/web/status#Localization) the label.
   */
  accessibilityLabel?: string,
  /**
   * Additional contextual information around the status. Only for use with `title`. See [localization](https://gestalt.pinterest.systems/web/status#Localization) to learn more.
   */
  subtext?: string,
  /**
   * A label to reinforce the meaning of the status icon. See [localization](https://gestalt.pinterest.systems/web/status#Localization) to learn more.
   */
  title?: string,
  /**
   * The type of status to display.
   */
  type: StatusType,
};

/**
 * [Status](https://gestalt.pinterest.systems/web/status) is a graphic indicator of an element’s state.
 *
 * ![Status light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Status.spec.mjs-snapshots/Status-chromium-darwin.png)
 * ![Status dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Status-dark.spec.mjs-snapshots/Status-dark-chromium-darwin.png)
 *
 */
export default function Status({ accessibilityLabel, subtext, title, type }: Props): Node {
  const { icon, color } = ICON_COLOR_MAP[type];

  return (
    <Flex direction="column">
      <Flex alignItems="center" gap={{ row: 2, column: 0 }}>
        <Icon accessibilityLabel={accessibilityLabel ?? ''} color={color} icon={icon} size={16} />
        {title && <Text size="200">{title}</Text>}
      </Flex>

      {subtext && title && (
        <Box marginStart={6}>
          <Text color="subtle" size="200">
            {subtext}
          </Text>
        </Box>
      )}
    </Flex>
  );
}
