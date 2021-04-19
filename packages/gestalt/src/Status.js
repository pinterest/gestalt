// @flow strict
import type { Node } from 'react';
import PropTypes from 'prop-types';
import Box from './Box.js';
import Icon from './Icon.js';
import Flex from './Flex.js';
import Text from './Text.js';

const ICON_COLOR_MAP = {
  unstarted: {
    icon: 'workflow-status-unstarted',
    color: 'darkGray',
  },
  inProgress: {
    icon: 'workflow-status-in-progress',
    color: 'green',
  },
  halted: {
    icon: 'workflow-status-halted',
    color: 'darkGray',
  },
  ok: {
    icon: 'workflow-status-ok',
    color: 'green',
  },
  problem: {
    icon: 'workflow-status-problem',
    color: 'red',
  },
  canceled: {
    icon: 'workflow-status-canceled',
    color: 'gray',
  },
  warning: {
    icon: 'workflow-status-warning',
    color: 'orange',
  },
};

type Props = {|
  type: 'unstarted' | 'inProgress' | 'halted' | 'ok' | 'problem' | 'canceled' | 'warning',
  title: string,
  subtext?: string,
|};

export default function Status({ type, title, subtext }: Props): Node {
  const { icon, color } = ICON_COLOR_MAP[type];

  return (
    <Flex direction="column">
      <Flex gap={2} alignItems="center">
        <Icon accessibilityLabel="" size={16} color={color} icon={icon} />
        <Text size="md">{title}</Text>
      </Flex>
      {subtext && (
        <Flex gap={2} alignItems="center">
          <Box marginStart={6}>
            <Text size="md" color="gray">
              {subtext}
            </Text>
          </Box>
        </Flex>
      )}
    </Flex>
  );
}

Status.propTypes = {
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  type: PropTypes.oneOf([
    'unstarted',
    'inProgress',
    'halted',
    'ok',
    'problem',
    'canceled',
    'warning',
  ]).isRequired,
  title: PropTypes.string.isRequired,
  subtext: PropTypes.string,
};
