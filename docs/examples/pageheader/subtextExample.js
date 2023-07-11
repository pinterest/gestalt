// @flow strict
import { type Node } from 'react';
import { Button, Dropdown, PageHeader } from 'gestalt';

export default function IncludeImageExample(): Node {
  return (
    <PageHeader
      title="Create product group"
      subtext="2,131 catalog products."
      helperLink={{
        accessibilityLabel: '',
        text: 'Learn more about bulk product catalog uploads.',
        href: 'http://www.pinterest.com',
        onClick: () => {},
      }}
      primaryAction={{
        component: <Button color="red" size="lg" text="Quick create" />,
        dropdownItems: [
          <Dropdown.Item
            key="quick-create"
            option={{ value: 'Quick create', label: 'Quick create' }}
            onSelect={() => {}}
          />,
        ],
      }}
      dropdownAccessibilityLabel="Additional options"
    />
  );
}
