// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, ButtonLink } from 'gestalt';

export default function Snapshot(): ReactNode {
  return (
    <Box padding={1}>
      <ButtonLink
        accessibilityLabel="Visit Pinterest"
        iconEnd="visit"
        size="lg"
        color="red"
        text="Visit Pinterest"
        rel="nofollow"
        target="blank"
        href="#"
      />
    </Box>
  );
}
