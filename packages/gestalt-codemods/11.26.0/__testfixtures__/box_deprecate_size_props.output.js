// @flow strict
import { Box, Box as RenamedBox } from 'gestalt';

export default function TestBox() {
  return (
    <Box column={12} display="flex">
      <RenamedBox mdColumn={12} mdDisplay="none" />
      <RenamedBox smColumn={12} smDisplay="flex" smDirection="column" />
      <RenamedBox lgColumn={12} />
    </Box>
  );
}
