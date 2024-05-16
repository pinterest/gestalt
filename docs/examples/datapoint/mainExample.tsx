import { Box, Datapoint } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Datapoint
        size="lg"
        title="Total impressions"
        tooltipText="The number of times your ads were seen, including earned impressions"
        trend={{ value: 30, accessibilityLabel: 'Trending up' }}
        value="2.34m"
      />
    </Box>
  );
}
