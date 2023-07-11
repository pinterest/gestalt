// @flow strict
import { type Node } from 'react';
import { Button, Datapoint, Dropdown, PageHeader } from 'gestalt';

export default function PageHeaderExample(): Node {
  return (
    <PageHeader
      title="Ads overview"
      items={[
        <Datapoint
          size="md"
          title="Impressions"
          key="impressions"
          value="$1.25M"
          trend={{ value: 30, accessibilityLabel: 'Trending up' }}
        />,
        <Datapoint
          size="md"
          title="Engagement"
          key="engagement"
          value="10%"
          trend={{ value: 5, accessibilityLabel: 'Trending up' }}
        />,
      ]}
      primaryAction={{
        component: <Button color="red" size="lg" text="Promote" />,
        dropdownItems: [
          <Dropdown.Item
            key="promote"
            option={{ value: 'Promote', label: 'Promote' }}
            onSelect={() => {}}
          />,
        ],
      }}
      secondaryAction={{
        component: <Button size="lg" text="View analytics" />,
        dropdownItems: [
          <Dropdown.Link
            option={{ value: 'View analytics', label: 'View analytics' }}
            key="view-analytics"
            href="https://pinterest.com"
          />,
        ],
      }}
      dropdownAccessibilityLabel="More options"
    />
  );
}
