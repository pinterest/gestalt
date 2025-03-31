import { ReactElement } from 'react';
import Box from './Box';
import Flex from './Flex';
import Icon from './Icon';
import IconCompact from './IconCompact';
import OverridingSpan from './sharedSubcomponents/OverridingSpan';
import Text from './Text';
import isComponentNode from './utils/isComponentNode';

const ICON_COLOR_MAP = {
  canceled: {
    icon: 'compact-workflow-status-canceled',
    color: 'subtle',
    compact: true,
  },
  halted: {
    icon: 'compact-workflow-status-halted',
    color: 'default',
    compact: true,
  },
  inProgress: {
    icon: 'compact-workflow-status-in-progress',
    color: 'success',
    compact: true,
  },
  locked: {
    icon: 'compact-lock',
    color: 'subtle',
    compact: true,
  },
  ok: {
    icon: 'compact-check-circle-fill',
    color: 'success',
    compact: true,
  },
  problem: {
    icon: 'compact-workflow-status-problem',
    color: 'error',
    compact: true,
  },
  unstarted: {
    icon: 'compact-workflow-status-unstarted',
    color: 'default',
    compact: true,
  },
  queued: {
    icon: 'workflow-status-queued',
    color: 'default',
    compact: false,
  },
  warning: {
    icon: 'compact-workflow-status-warning',
    color: 'warning',
    compact: true,
  },
} as const;

type StatusType =
  | 'unstarted'
  | 'queued'
  | 'inProgress'
  | 'halted'
  | 'locked'
  | 'ok'
  | 'problem'
  | 'canceled'
  | 'warning';

type Props = {
  /**
   * If not using `title`, provide an accessibility label to give the user context about the icon. Be sure to [localize](https://gestalt.pinterest.systems/web/status#Localization) the label.
   */
  accessibilityLabel?: string;
  /**
   * Additional contextual information around the status. Only for use with `title`. See [localization](https://gestalt.pinterest.systems/web/status#Localization) to learn more.
   */
  subtext?: string;
  /**
   * A label to reinforce the meaning of the status icon. See [localization](https://gestalt.pinterest.systems/web/status#Localization) to learn more.
   */
  title?: string | ReactElement;
  /**
   * The type of status to display.
   */
  type: StatusType;
};

/**
 * [Status](https://gestalt.pinterest.systems/web/status) is a graphic indicator of an element’s state.
 *
 * ![Status light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Status.spec.ts-snapshots/Status-chromium-darwin.png)
 * ![Status dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Status-dark.spec.ts-snapshots/Status-dark-chromium-darwin.png)
 *
 */
export default function Status({ accessibilityLabel, subtext, title, type }: Props) {
  const { icon, color, compact } = ICON_COLOR_MAP[type];
  const isTextNode = title && isComponentNode({ text: title, components: ['Text'] });

  return (
    <Flex direction="column">
      <Flex alignItems="center" gap={{ row: 2, column: 0 }}>
        {compact ? (
          <IconCompact
            accessibilityLabel={accessibilityLabel ?? ''}
            color={color}
            icon={icon}
            size={16}
          />
        ) : (
          <Icon accessibilityLabel={accessibilityLabel ?? ''} color={color} icon={icon} size={16} />
        )}
        {isTextNode && <OverridingSpan size="200" textElement={title ?? ''} />}
        {!isTextNode && title && <Text size="200">{title}</Text>}
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

Status.displayName = 'Status';
