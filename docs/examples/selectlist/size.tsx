import { Box, Flex, SelectList } from 'gestalt';

export default function Example() {
  return (
    <Box padding={8} width="100%">
      <Flex direction="column" gap={6} width="100%">
        <SelectList id="selectlistMd" label="Country" onChange={() => {}} size="md">
          {[
            { label: 'Algeria', value: 'algeria' },
            { label: 'Belgium', value: 'belgium' },
            { label: 'Canada', value: 'canada' },
            { label: 'Denmark', value: 'denmark' },
            { label: 'Egypt', value: 'egypt' },
            { label: 'France', value: 'france' },
          ].map(({ label, value }) => (
            <SelectList.Option key={label} label={label} value={value} />
          ))}
        </SelectList>
        <SelectList id="selectlistLg" label="Country" onChange={() => {}} size="lg">
          {[
            { label: 'Algeria', value: 'algeria' },
            { label: 'Belgium', value: 'belgium' },
            { label: 'Canada', value: 'canada' },
            { label: 'Denmark', value: 'denmark' },
            { label: 'Egypt', value: 'egypt' },
            { label: 'France', value: 'france' },
          ].map(({ label, value }) => (
            <SelectList.Option key={label} label={label} value={value} />
          ))}
        </SelectList>
      </Flex>
    </Box>
  );
}
