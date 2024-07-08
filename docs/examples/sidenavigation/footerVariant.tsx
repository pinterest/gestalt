import { Box, Fieldset, Flex, SideNavigation, Text } from 'gestalt';
import { DatePicker } from 'gestalt-datepicker';

export default function Example() {
  return (
    <Box height="100%" padding={2} width={300}>
      <SideNavigation
        accessibilityLabel="Footer example"
        footer={
          <Flex direction="column" gap={{ column: 4, row: 0 }}>
            <Text size="300" weight="bold">
              Filters
            </Text>
            <Fieldset legend="Campaign filters" legendDisplay="hidden">
              <Flex direction="column" gap={{ column: 4, row: 0 }}>
                <DatePicker
                  id="example-start-date"
                  label="Start"
                  onChange={() => {}}
                  rangeSelector="start"
                  value={new Date()}
                />
                <DatePicker
                  id="example-end-date"
                  label="End"
                  onChange={() => {}}
                  rangeSelector="end"
                  value={new Date(+7)}
                />
              </Flex>
            </Fieldset>
          </Flex>
        }
      >
        <SideNavigation.Section label="Campaigns">
          {[
            {
              label: 'Active',
              counter: { number: '200', accessibilityLabel: '200 Pins' },
            },
            {
              label: 'Draft',
              counter: { number: '100', accessibilityLabel: '100 Pins' },
            },
          ].map(({ label, counter }) => (
            <SideNavigation.TopItem
              key={label}
              counter={counter}
              href="#"
              icon="ads-stats"
              label={label}
            />
          ))}
        </SideNavigation.Section>
      </SideNavigation>
    </Box>
  );
}
