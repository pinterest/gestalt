// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, ButtonLink } from 'gestalt';

export default function Snapshot(): ReactNode {
  return (
    <Box padding={1}>
      <ButtonLink
        accessibilityLabel="Visit Pinterest"
        color="red"
        href="#"
        iconEnd="visit"
        rel="nofollow"
        size="lg"
        target="blank"
        text="Visit Pinterest"
      />
    </Box>
  );
}
