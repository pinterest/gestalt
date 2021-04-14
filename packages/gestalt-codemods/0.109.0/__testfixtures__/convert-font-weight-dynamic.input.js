// @flow strict
import { Text } from 'gestalt';

export default function BoldText({
  isCurrentPage,
}: {
  isCurrentPage?: boolean,
}) {
  return (
    <Text bold={isCurrentPage} size="xl">
      Bold
    </Text>
  );
}
