import { Fragment, useState } from 'react';
import { Flex, RadioGroup, SideNavigation } from 'gestalt';

export default function Example() {
  const [organisedBy, setOrganisedBy] = useState('categorized');

  return (
    <SideNavigation
      accessibilityLabel="Header example"
      header={
        <RadioGroup id="example-header" legend="Sort by?">
          <Flex
            gap={{
              row: 2,
              column: 0,
            }}
          >
            <RadioGroup.RadioButton
              checked={organisedBy === 'categorized'}
              id="category"
              label="Category"
              name="SortCategory"
              onChange={() => setOrganisedBy('categorized')}
              size="sm"
              value="categorized"
            />
            <RadioGroup.RadioButton
              checked={organisedBy === 'alphabetical'}
              id="alphabetical"
              label="Alphabetical"
              name="SortCAlphabetical"
              onChange={() => setOrganisedBy('alphabetical')}
              size="sm"
              value="alphabetical"
            />
          </Flex>
        </RadioGroup>
      }
    >
      {organisedBy === 'categorized' ? (
        <Fragment>
          <SideNavigation.Section label="Navigation">
            <SideNavigation.TopItem href="#" label="PageHeader" />
            <SideNavigation.TopItem href="#" label="Tabs" />
            <SideNavigation.TopItem
              badge={{ text: 'New', type: 'info' }}
              href="#"
              label="SideNavigation"
            />
          </SideNavigation.Section>
          <SideNavigation.Section label="Controls">
            <SideNavigation.TopItem
              badge={{ text: 'Deprecated', type: 'warning' }}
              href="#"
              label="RadioButton"
            />
            <SideNavigation.TopItem href="#" label="RadioGroup" />
          </SideNavigation.Section>
        </Fragment>
      ) : (
        <Fragment>
          <SideNavigation.TopItem href="#" label="PageHeader" />
          <SideNavigation.TopItem
            badge={{ text: 'Deprecated', type: 'warning' }}
            href="#"
            label="RadioButton"
          />
          <SideNavigation.TopItem href="#" label="RadioGroup" />
          <SideNavigation.TopItem
            badge={{ text: 'New', type: 'info' }}
            href="#"
            label="SideNavigation"
          />
          <SideNavigation.TopItem href="/web/tabs" label="Tabs" />
        </Fragment>
      )}
    </SideNavigation>
  );
}
