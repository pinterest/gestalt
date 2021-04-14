// @flow strict
import { Box, Box as RenamedBox } from 'gestalt';

export default function TestBox() {
  return (
    <Box xs={{ column: 12, display: "flex" }}>
      <RenamedBox md={{ column: 12, display: false }} />
      <RenamedBox sm={{ column: 12, display: "flexColumn" }} />
      <RenamedBox lg={{ column: 12, display: true }} />
    </Box>
  );
}
