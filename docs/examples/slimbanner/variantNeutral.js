// @flow strict
import { type Node } from 'react';
import { Box, SlimBanner } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <SlimBanner message="Your total audience includes all users who have seen or engaged with any of your Pins in the last 30 days." />
    </Box>
  );
}
