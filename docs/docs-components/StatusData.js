// @flow strict
import { type Node } from 'react';
import { Flex, Icon, Link, Status, Text } from 'gestalt';
import { STATUS_DESCRIPTION, STATUS_EQUIVALENCY_MAP } from './data/componentStatusMessaging.js';
import { type StatusType } from './data/types.js';

type Props = {|
  status: StatusType | 'deprecated',
  text?: string,
  href?: string,
|};

export default function StatusData({ status, text, href }: Props): Node {
  const label = text || STATUS_DESCRIPTION[status].title;

  if (!status) return null;

  return (
    <Flex
      gap={{
        row: 2,
        column: 0,
      }}
      alignItems="center"
    >
      {STATUS_EQUIVALENCY_MAP[status] === 'notAvailable' ? (
        <Icon accessibilityLabel="Not available" icon="dash" />
      ) : (
        <Status
          accessibilityLabel={`This component is ${label}`}
          type={STATUS_EQUIVALENCY_MAP[status]}
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
  );
}
