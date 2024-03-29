// @flow strict
import React, { type Node as ReactNode } from 'react';
import { Fieldset, Flex, SideNavigation, Text } from 'gestalt';
import { DatePicker } from 'gestalt-datepicker';

export default function Example(): ReactNode {
  return (
    <SideNavigation
      accessibilityLabel="Footer example"
      footer={
        <Flex
          direction="column"
          gap={{
            row: 0,
            column: 4,
          }}
        >
          <Text size="300" weight="bold">
            Filters
          </Text>
          <Fieldset legend="Campaign filters" legendDisplay="hidden">
            <Flex
              direction="column"
              gap={{
                row: 0,
                column: 4,
              }}
            >
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
  );
}
