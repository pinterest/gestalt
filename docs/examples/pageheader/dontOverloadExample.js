// @flow strict
import React, { type Node } from 'react';
import { Button, Datapoint, Dropdown, PageHeader, Sheet, Text } from 'gestalt';
import LINKS from '../../docs-components/LINK_REPOSITORY.js';

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
          href: LINKS.PINTEREST_CANONICAL,
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
              href={LINKS.PINTEREST_CANONICAL}
            />,
          ],
        }}
        dropdownAccessibilityLabel="More options"
      />
      {open ? (
        <Sheet
          accessibilityDismissButtonLabel="Close"
          accessibilitySheetLabel="Example sheet for demonstration"
          heading="Guidance"
          onDismiss={() => setOpen(false)}
          size="md"
        >
          <Text>1</Text>
          <Text>2</Text>
          <Text>3</Text>
        </Sheet>
      ) : null}
    </React.Fragment>
  );
}
