import { Box, Datapoint } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Datapoint
        badge={{ text: 'Early access' }}
        title="Spend"
        tooltipText="Total ad spend in the selected time period"
        value="$5.7k"
      />
    </Box>
  );
}
