// @flow strict
import React, { type Node } from 'react';
import { SideNavigation, Flex, Text, Fieldset } from 'gestalt';
import DatePicker from 'gestalt-datepicker';

export default function Example(): Node {
  return (
    <SideNavigation
      accessibilityLabel="Footer example"
      footer={
        <Flex direction="column" gap={4}>
          <Text size="300" weight="bold">
            Filters
          </Text>
          <Fieldset legend="Campaign filters" legendDisplay="hidden">
            <Flex direction="column" gap={4}>
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
        ].map(({ label, counter }, idx) => (
          <SideNavigation.TopItem
            key={idx}
            href="#"
            label={label}
            icon="ads-stats"
            counter={counter}
          />
        ))}
      </SideNavigation.Section>
    </SideNavigation>
  );
}
