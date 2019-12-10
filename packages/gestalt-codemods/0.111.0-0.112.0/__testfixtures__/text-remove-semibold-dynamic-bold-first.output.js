// @flow
import React from 'react';
import { Text } from 'gestalt';

export default function BoldText({
  isCurrentPage,
}: {
  isCurrentPage?: boolean,
}) {
  return (
    <Text weight="bold" size={isCurrentPage ? "xl" : "md"}>
      Bold
    </Text>
  );
}
