// @flow strict
import React, { type Node } from 'react';
import { Button, Datapoint, Dropdown, OverlayPanel, PageHeader, Text } from 'gestalt';

export default function DontOverloadExample(): Node {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <PageHeader
        title="Ads overview"
        helperIconButton={{
          accessibilityControls: '',
          accessibilityExpanded: open,
          accessibilityLabel: 'Read more information about Ads overview',
          onClick: () => setOpen(true),
        }}
        subtext="5 active campaigns."
        helperLink={{
          text: 'Learn more.',
          accessibilityLabel: 'Learn more Pinterest.com',
          href: 'http://www.pinterest.com',
          onClick: () => setOpen(true),
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
      {open ? (
        <OverlayPanel
          accessibilityDismissButtonLabel="Close"
          accessibilityLabel="Example overlay panel for demonstration"
          heading="Guidance"
          onDismiss={() => setOpen(false)}
          size="md"
        >
          <Text>1</Text>
          <Text>2</Text>
          <Text>3</Text>
        </OverlayPanel>
      ) : null}
    </React.Fragment>
  );
}
