import { ReactNode } from 'react';
import { Button, Dropdown, PageHeader } from 'gestalt';

export default function IncludeImageExample() {
  return (
    <PageHeader
      dropdownAccessibilityLabel="Additional options"
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
            onSelect={() => {}}
            option={{ value: 'Quick create', label: 'Quick create' }}
          />,
        ],
      }}
      subtext="2,131 catalog products."
      title="Create product group"
    />
  );
}
