import { Button, Datapoint, Dropdown, PageHeader } from 'gestalt';

export default function PageHeaderExample() {
  return (
    <PageHeader
      dropdownAccessibilityLabel="More options"
      items={[
        <Datapoint
          key="impressions"
          size="md"
          title="Impressions"
          trend={{ value: 30, accessibilityLabel: 'Trending up' }}
          value="$1.25M"
        />,
        <Datapoint
          key="engagement"
          size="md"
          title="Engagement"
          trend={{ value: 5, accessibilityLabel: 'Trending up' }}
          value="10%"
        />,
      ]}
      primaryAction={{
        component: <Button color="red" size="lg" text="Promote" />,
        dropdownItems: [
          <Dropdown.Item
            key="promote"
            onSelect={() => {}}
            option={{ value: 'Promote', label: 'Promote' }}
          />,
        ],
      }}
      secondaryAction={{
        component: <Button size="lg" text="View analytics" />,
        dropdownItems: [
          <Dropdown.Link
            key="view-analytics"
            href="https://pinterest.com"
            option={{ value: 'View analytics', label: 'View analytics' }}
          />,
        ],
      }}
      title="Ads overview"
    />
  );
}
