// @flow strict
import { Text } from 'gestalt';

export default function BoldText({
  isCurrentPage,
}: {
  isCurrentPage?: boolean,
}) {
  return (
    <Text weight={isCurrentPage ? "bold" : "semibold"} size={isCurrentPage ? "xl" : "md"}>
      Bold
    </Text>
  );
}
