// @flow strict
import { Box, Callout, Callout as Renamed } from 'gestalt';

export default function TestBox() {
  return (
    <Box>
      <Callout
        type="error"
        iconAccessibilityLabel="Error icon"
        message="This action can't be undone."
      />
      <Renamed
        type="error"
        iconAccessibilityLabel="Error icon"
        message="This action can't be undone."
      />
    </Box>
  );
}
