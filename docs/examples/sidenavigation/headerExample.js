// @flow strict
import React, { type Node } from 'react';
import { SideNavigation, RadioGroup, Flex } from 'gestalt';

export default function Example(): Node {
  const [organisedBy, setOrganisedBy] = React.useState('categorized');

  return (
    <SideNavigation
      accessibilityLabel="Header example"
      header={
        <RadioGroup legend="Sort by?" id="example-header">
          <Flex gap={2}>
            <RadioGroup.RadioButton
              checked={organisedBy === 'categorized'}
              id="category"
              label="Category"
              name="SortCategory"
              onChange={() => setOrganisedBy('categorized')}
              value="categorized"
              size="sm"
            />
            <RadioGroup.RadioButton
              checked={organisedBy === 'alphabetical'}
              id="alphabetical"
              label="Alphabetical"
              name="SortCAlphabetical"
              onChange={() => setOrganisedBy('alphabetical')}
              value="alphabetical"
              size="sm"
            />
          </Flex>
        </RadioGroup>
      }
    >
      {organisedBy === 'categorized' ? (
        <React.Fragment>
          <SideNavigation.Section label="Navigation">
            <SideNavigation.TopItem
              href="https://gestalt.pinterest.systems/web/pageheader"
              label="PageHeader"
            />
            <SideNavigation.TopItem
              href="https://gestalt.pinterest.systems/web/tabs"
              label="Tabs"
            />
            <SideNavigation.TopItem
              href="https://gestalt.pinterest.systems/get_started/developers/tooling/web"
              label="SideNavigation"
              badge={{ text: 'New', type: 'info' }}
            />
          </SideNavigation.Section>
          <SideNavigation.Section label="Controls">
            <SideNavigation.TopItem
              href="https://gestalt.pinterest.systems/web/radiobutton"
              label="RadioButton"
              badge={{ text: 'Deprecated', type: 'warning' }}
            />
            <SideNavigation.TopItem
              href="https://gestalt.pinterest.systems/web/radiogroup"
              label="RadioGroup"
            />
          </SideNavigation.Section>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <SideNavigation.TopItem
            href="https://gestalt.pinterest.systems/web/pageheader"
            label="PageHeader"
          />
          <SideNavigation.TopItem
            href="https://gestalt.pinterest.systems/web/radiobutton"
            label="RadioButton"
            badge={{ text: 'Deprecated', type: 'warning' }}
          />
          <SideNavigation.TopItem
            href="https://gestalt.pinterest.systems/web/radiogroup"
            label="RadioGroup"
          />
          <SideNavigation.TopItem
            href="https://gestalt.pinterest.systems/get_started/developers/tooling/web"
            label="SideNavigation"
            badge={{ text: 'New', type: 'info' }}
          />
          <SideNavigation.TopItem href="https://gestalt.pinterest.systems/web/tabs" label="Tabs" />
        </React.Fragment>
      )}
    </SideNavigation>
  );
}
