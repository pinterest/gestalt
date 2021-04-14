// @flow strict
import { Text } from 'gestalt';

export default function BoldText({
  isCurrentPage,
}: {
  isCurrentPage?: boolean,
}) {
  return (
    <Text size="xl" weight={isCurrentPage ? "bold" : "normal"}>
      Bold
    </Text>
  );
}
