// @flow strict
import { type Node } from 'react';
import { Flex, Status, Text, Icon, Link } from 'gestalt';
import { STATUS_EQUIVALENCY_MAP, STATUS_DESCRIPTION } from './COMPONENT_STATUS_MESSAGING.js';

export default function StatusData({
  type,
  text,
  href,
}: {|
  type: 'ready' | 'notAvailable' | 'partial' | 'planned' | 'deprecated',
  text?: string,
  href?: string,
|}): Node {
  let label = STATUS_DESCRIPTION[type].title;
  if (text) {
    label = text;
  }

  return type ? (
    <Flex gap={2} alignItems="center">
      {STATUS_EQUIVALENCY_MAP[type] === 'notAvailable' ? (
        <Icon accessibilityLabel="Not available" icon="dash" />
      ) : (
        <Status
          accessibilityLabel={`This component is ${label}`}
          type={STATUS_EQUIVALENCY_MAP[type]}
          title={href ? '' : label}
        />
      )}
      {href ? (
        <Text size="200">
          <Link underline="always" href={href}>
            {label === 'Not available' ? 'N/A' : label}{' '}
          </Link>
        </Text>
      ) : null}
    </Flex>
  ) : null;
}
