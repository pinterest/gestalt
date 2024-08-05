import { Box, SelectList } from 'gestalt';

export default function Example() {
  return (
    <Box padding={8} width="100%">
      <SelectList id="selectlistexample5" label="Gender" onChange={() => {}} size="lg">
        {[
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' },
          { label: 'Non-binary', value: 'nonbinary' },
        ].map(({ label, value }) => (
          <SelectList.Option key={label} label={label} value={value} />
        ))}
      </SelectList>
    </Box>
  );
}
