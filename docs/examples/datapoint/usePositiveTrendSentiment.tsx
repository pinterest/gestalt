import { Box, Datapoint } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Datapoint
        size="lg"
        title="Total spend"
        trend={{ value: 5.6, accessibilityLabel: 'Trending up' }}
        trendSentiment="neutral"
        value="$14,325"
      />
    </Box>
  );
}
