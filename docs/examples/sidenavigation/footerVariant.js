// @flow strict
import { type Node } from 'react';
import { Box, Fieldset, Flex, SideNavigation, Text } from 'gestalt';
import { DatePicker } from 'gestalt-datepicker';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Box width="100%" height="100%">
        <Box height="100%" width={280} overflow="scroll">
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
                  href="#"
                  label={label}
                  icon="ads-stats"
                  counter={counter}
                />
              ))}
            </SideNavigation.Section>
          </SideNavigation>
        </Box>
      </Box>
    </Box>
  );
}
