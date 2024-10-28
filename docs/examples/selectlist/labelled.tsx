import { Box, Flex, IconButton, Label, SelectList, Text } from 'gestalt';

export default function Example() {
  return (
    <Box padding={8} width="100%">
      <Flex direction="column" gap={6} width="100%">
        <Flex direction="column" gap={2}>
          <Label htmlFor="selectList-labelled">
            <Flex alignItems="center" gap={1}>
              <Text size="300">Date range</Text>
              <IconButton
                accessibilityLabel="Info"
                icon="info-circle"
                size="sm"
                tooltip={{
                  text: 'Options available are based on your usage.',
                  idealDirection: 'right',
                }}
              />
            </Flex>
          </Label>
          <SelectList
            id="selectList-labelled"
            label="Date range"
            labelDisplay="hidden"
            onChange={() => {}}
            size="md"
          >
            {[
              { label: 'Last 5 days', value: '5' },
              { label: 'Last week', value: '7' },
              { label: 'Last 30 days', value: '30' },
              { label: 'Last sixth months', value: '6m' },
              { label: 'Last year', value: '365' },
            ].map(({ label, value }) => (
              <SelectList.Option key={label} label={label} value={value} />
            ))}
          </SelectList>
        </Flex>
        <Flex direction="column" gap={2}>
          <Label htmlFor="selectList-labelled">
            <Flex alignItems="center" gap={1}>
              <Text size="300">Date range</Text>
              <IconButton
                accessibilityLabel="Info"
                icon="info-circle"
                size="sm"
                tooltip={{
                  text: 'Options available are based on your usage.',
                  idealDirection: 'right',
                }}
              />
            </Flex>
          </Label>
          <SelectList
            id="selectList-labelled"
            label="Date range"
            labelDisplay="hidden"
            onChange={() => {}}
            size="lg"
          >
            {[
              { label: 'Last 5 days', value: '5' },
              { label: 'Last week', value: '7' },
              { label: 'Last 30 days', value: '30' },
              { label: 'Last sixth months', value: '6m' },
              { label: 'Last year', value: '365' },
            ].map(({ label, value }) => (
              <SelectList.Option key={label} label={label} value={value} />
            ))}
          </SelectList>
        </Flex>
      </Flex>
    </Box>
  );
}
