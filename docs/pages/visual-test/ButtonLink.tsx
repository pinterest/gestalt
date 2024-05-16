import {ReactNode} from 'react';
import { Box, ButtonLink } from 'gestalt';

export default function Snapshot() {
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
