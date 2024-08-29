import { Flex, Icon, Link, Status, Text } from 'gestalt';
import { STATUS_DESCRIPTION, STATUS_EQUIVALENCY_MAP } from './data/componentStatusMessaging';
import { type StatusType } from './data/types';

type Props = {
  status: StatusType | 'deprecated';
  text?: string;
  href?: string;
};

export default function StatusData({ status, text, href }: Props) {
  const label = text || STATUS_DESCRIPTION[status].title;

  if (!status) return null;

  return (
    <Flex
      alignItems="center"
      gap={{
        row: 2,
        column: 0,
      }}
    >
      {STATUS_EQUIVALENCY_MAP[status] === 'notAvailable' ? (
        <Icon accessibilityLabel="Not available" icon="dash" />
      ) : (
        <Status
          accessibilityLabel={`This component is ${label}`}
          title={href ? '' : label}
          // @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"ok" | "inProgress" | "unstarted" | "canceled" | "queued" | "halted" | "problem" | "warning"'.
          type={STATUS_EQUIVALENCY_MAP[status] !== 'notAvailable' && STATUS_EQUIVALENCY_MAP[status]}
        />
      )}
      {href ? (
        <Text size="200">
          <Link href={href} underline="always">
            {label === 'Not available' ? 'N/A' : label}{' '}
          </Link>
        </Text>
      ) : null}
    </Flex>
  );
}
