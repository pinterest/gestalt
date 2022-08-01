// @flow strict
import React, { type Node } from 'react';
import { Button, Datapoint, Dropdown, PageHeader } from 'gestalt';

export default function IncludeImageExample(): Node {
  return (
    <PageHeader
      title="Ads overview"
      helperIconButton={{
        accessibilityControls: '',
        accessibilityExpanded: false,
        accessibilityLabel: 'Read more information about Ads overview',
        onClick: () => {},
      }}
      items={[
        <Datapoint
          key="impressions"
          size="md"
          title="Impressions"
          value="$1.25M"
          trend={{ value: 30, accessibilityLabel: 'Trending up' }}
        />,
        <Datapoint
          key="engagement"
          size="md"
          title="Engagement"
          value="10%"
          trend={{ value: 5, accessibilityLabel: 'Trending up' }}
        />,
      ]}
      primaryAction={{
        component: <Button color="red" size="lg" text="Promote" />,
        dropdownItems: [
          <Dropdown.Item
            option={{ value: 'Promote', label: 'Promote' }}
            onSelect={() => {}}
            key="promote"
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
