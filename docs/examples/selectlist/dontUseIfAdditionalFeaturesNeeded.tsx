import { Box, SelectList } from 'gestalt';

export default function Example() {
  return (
    <Box padding={8} width="100%">
      <SelectList id="selectlistexample3" label="Country" onChange={() => {}} size="lg">
        {[
          { label: 'Algeria', value: 'algeria' },
          { label: 'An image of Belgium', value: 'belgium' },
          { label: 'Canada', value: 'canada' },
          { label: 'A longer description of Denmark with subtext', value: 'denmark' },
          { label: 'Egypt', value: 'egypt' },
          { label: 'France', value: 'france' },
        ].map(({ label, value }) => (
          <SelectList.Option key={label} label={label} value={value} />
        ))}
      </SelectList>
    </Box>
  );
}
