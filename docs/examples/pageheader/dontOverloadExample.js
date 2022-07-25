// @flow strict
import React, { type Node } from 'react';
import { Button, Datapoint, Dropdown, PageHeader } from 'gestalt';

export default function DontOverloadExample(): Node {
  return (
    <PageHeader
      title="Ads overview"
      helperIconButton={{
        accessibilityControls: '',
        accessibilityExpanded: false,
        accessibilityLabel: 'Read more information about Ads overview',
        onClick: () => {},
      }}
      subtext="5 active campaigns."
      helperLink={{
        text: 'Learn more.',
        accessibilityLabel: 'Learn more Pinterest.com',
        href: 'http://www.pinterest.com',
        onClick: () => {},
      }}
      items={[
        <Datapoint
          key="impressions"
          size="md"
          title="Impressions"
          value="$1.25M"
          tooltipText="The number of times your ads were seen."
          trend={{ value: 30, accessibilityLabel: 'Trending up' }}
        />,
        <Datapoint
          key="engagement"
          size="md"
          title="Engagement"
          value="10%"
          tooltipText="The number of times your ads were clicked."
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
            key="view-analytics"
            option={{ value: 'View analytics', label: 'View analytics' }}
            href="https://pinterest.com"
          />,
        ],
      }}
      dropdownAccessibilityLabel="More options"
    />
  );
}
