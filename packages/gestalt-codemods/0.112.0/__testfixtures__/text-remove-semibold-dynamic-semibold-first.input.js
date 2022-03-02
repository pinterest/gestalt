// @flow strict
import { Text } from 'gestalt';

export default function BoldText({
  isCurrentPage,
}: {
  isCurrentPage?: boolean,
}) {
  return (
    <Text weight={isCurrentPage ? "semibold" : "bold" } size={isCurrentPage ? "xl" : "md"}>
      Bold
    </Text>
  );
}
