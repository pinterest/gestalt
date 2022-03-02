// @flow strict
import { Box, Callout, Callout as Renamed } from 'gestalt';

export default function TestBox() {
  return (
    <Box>
      <Callout
        type="error"
        iconAccessibilityLabel="Error icon"
        description="This action can't be undone."
      />
      <Renamed
        type="error"
        iconAccessibilityLabel="Error icon"
        description="This action can't be undone."
      />
    </Box>
  );
}
