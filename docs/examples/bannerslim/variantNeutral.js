// @flow strict
import { type Node as ReactNode } from 'react';
import { BannerSlim, Box } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <BannerSlim message="Your total audience includes all users who have seen or engaged with any of your Pins in the last 30 days." />
    </Box>
  );
}
